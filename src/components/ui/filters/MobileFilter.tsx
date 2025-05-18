'use client'

import { geistSans, inter } from "@/lib/fonts";
import { Genre } from "@/lib/types"
import { parseQueryParamsToUrl } from "@/lib/util";
import clsx from "clsx";
import { ChevronDown, ChevronRight, ChevronUp, Search, X } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

type FilterProps = {
  type: "movie" | "series";
  genres: Genre[];
}

interface FormData {
  name: string;
  minYear: number;
  maxYear: number;
}

export default function MobileFilter({ genres, type }: FilterProps) {
  const pathName = usePathname()
  const { replace } = useRouter()

  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isGenreListOpen, setIsGenreListOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    minYear: 1980,
    maxYear: 2025
  })

  useEffect(() => {
    validateYears()
  }, [formData.minYear, formData.maxYear])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const queryParams = {
      name: formData.name,
      minyear: formData.minYear,
      maxyear: formData.maxYear,
      genre: selectedGenres
    }
    const queryString = parseQueryParamsToUrl(queryParams)
    replace(`${pathName}${queryString}`)
  }

  const handleGenreSelection = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId))
    } else {
      setSelectedGenres([...selectedGenres, genreId])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "name" ? value : Number(value) })
  }

  const validateYears = () => {
    if (formData.minYear < 1) {
      setFormData({
        ...formData,
        minYear: 1980
      })
    }
    if (formData.maxYear > 2025) {
      setFormData({
        ...formData,
        maxYear: 2025
      })
    }
    if (formData.minYear > formData.maxYear) {
      setFormData({
        ...formData,
        minYear: formData.maxYear,
        maxYear: formData.minYear
      })
    }
  }

  return (
    <aside className={clsx(
      "md:hidden h-fit w-full bg-neutral-700 rounded-md",
      {
        "px-6 py-4": !isFilterOpen,
        "px-6 py-6": isFilterOpen
      }
    )}>
      <div className="flex items-center justify-between text-white" onClick={() => setIsFilterOpen(!isFilterOpen)}>
        <h3 className={`text-xl font-bold ${inter.className}`}>Filtros</h3>
        <button type="button">
          <ChevronRight width={20} height={20} className={clsx(
            "transition-all",
            {
              "rotate-90": isFilterOpen
            }
          )} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className={clsx(
        "space-y-2 mt-2",
        {
          "hidden": !isFilterOpen
        }
      )}>
        <section className="space-y-2">
          <h4 className={`text-neutral-300 ${geistSans.className}`}>Por nombre</h4>
          <div className="flex items-center justify-between gap-2 bg-neutral-600 px-2.5 py-1 rounded-md text-neutral-300">
            <input className="w-64 bg-transparent outline-none" onChange={handleChange} name="name" value={formData.name} type="text" placeholder="Buscar por nombre..." />
            <button type="submit" className="cursor-pointer hover:text-neutral-100 transition-all">
              <Search width={20} height={20} />
            </button>
          </div>
        </section>
        <section className="space-y-2">
          <h4 className={`text-neutral-300 ${geistSans.className}`}>Por género</h4>
          <div className="relative">
            <button type="button" onClick={() => setIsGenreListOpen(!isGenreListOpen)}
              className="flex items-center justify-between w-full bg-neutral-600 px-2.5 py-1 rounded-md text-neutral-300">
              {
                selectedGenres.length > 0 ? (
                  <span className="line-clamp-1">
                    {selectedGenres.map((genre) => genres.find((g) => g.id === genre)?.name).join(", ")}
                  </span>
                ) : (
                  <span>Seleccionar género</span>
                )
              }
              <ChevronRight width={20} height={20} className={clsx(
                "transition-all",
                {
                  "rotate-90": isGenreListOpen
                }
              )} />
            </button>
            <ul className={clsx(
              "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-sm bg-neutral-600 py-1 px-1.5 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden space-y-1",
              {
                "hidden": !isGenreListOpen
              }
            )} tabIndex={-1} role="listbox" aria-labelledby="listbox-label">
              {genres.map((genre: Genre) => {
                return (
                  <li key={genre.id} onClick={() => handleGenreSelection(genre.id)}
                    className={clsx(
                      "relative cursor-default py-2 pr-9 pl-3 text-neutral-200 select-none rounded-sm",
                      {
                        "bg-neutral-500": selectedGenres.includes(genre.id)
                      }
                    )} role="option">
                    {genre.name}
                  </li>
                )
              })}
            </ul>
          </div>
          {/*
          <div className="flex flex-wrap gap-2">
            {
              genres.map((genre: Genre) => {
                return (
                  <button key={genre.id}
                    type="button"
                    title={`Seleccionar género ${genre.name}`}
                    onClick={() => handleGenreSelection(genre.id)}
                    className={clsx(
                      "bg-neutral-600 hover:border-neutral-400 px-2 py-0.5 rounded-full text-neutral-300 border text-sm cursor-pointer transition-all",
                      {
                        "border-neutral-400": selectedGenres.includes(genre.id),
                        "border-transparent": !selectedGenres.includes(genre.id)
                      }
                    )}>
                    {genre.name}
                  </button>
                )
              })
            }
          </div>
          */}
        </section>
        <section className="space-y-2">
          <h4 className={`text-neutral-300 ${geistSans.className}`}>Por año</h4>
          <div className="flex items-center justify-between gap-2 text-neutral-300">
            <input className="w-24 bg-neutral-600 px-2.5 py-1 rounded-md outline-none" onChange={handleChange} name="minYear" value={formData.minYear} type="number" min={1980} max={2025} placeholder="1980" />
            <span>-</span>
            <input className="w-24 bg-neutral-600 px-2.5 py-1 rounded-md outline-none" onChange={handleChange} name="maxYear" value={formData.maxYear} type="number" min={1980} max={2025} placeholder="2025" />
          </div>
        </section>
        <button type="submit"
          className={`bg-white hover:bg-white/90 transition-all text-black py-1 w-full mt-2 rounded-sm font-medium cursor-pointer animate-fade animate-duration-[500ms] text-sm ${inter.className}`}
        >
          Aplicar
        </button>
      </form>
    </aside>
  )
}