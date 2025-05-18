'use client'

import { geistSans, inter } from "@/lib/fonts";
import { Genre } from "@/lib/types"
import { parseQueryParamsToUrl } from "@/lib/util";
import clsx from "clsx";
import { Search } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import MobileFilter from "./MobileFilter";

type FilterProps = {
  type: "movie" | "series";
  genres: Genre[];
}

interface FormData {
  name: string;
  minYear: number;
  maxYear: number;
}

export default function Filters({ genres, type }: FilterProps) {
  const pathName = usePathname()
  const { replace } = useRouter()

  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
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
    <>
      <aside className="hidden md:block h-fit w-64 bg-neutral-700 p-6 rounded-md">
        <h3 className={`text-xl font-bold text-white ${inter.className} mb-2`}>Filtros</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
        <section className="space-y-2">
          <h4 className={`text-neutral-300 text-sm ${geistSans.className}`}>Por nombre</h4>
          <div className="flex items-center justify-between gap-2 bg-neutral-600 px-2.5 py-1 rounded-md text-neutral-300">
            <input className="w-40 bg-transparent outline-none" onChange={handleChange} name="name" value={formData.name} type="text" placeholder="Buscar por nombre..." />
            <button type="submit" className="cursor-pointer hover:text-neutral-100 transition-all">
              <Search width={20} height={20} />
            </button>
          </div>
        </section>
        <section className="space-y-2">
          <h4 className={`text-neutral-300 text-sm ${geistSans.className}`}>Por género</h4>
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
        </section>
        <section className="space-y-2">
          <h4 className={`text-neutral-300 text-sm ${geistSans.className}`}>Por año</h4>
          <div className="flex items-center justify-between gap-2 text-neutral-300">
            <input className="w-24 bg-neutral-600 px-2.5 py-1 rounded-md outline-none" onChange={handleChange} name="minYear" value={formData.minYear} type="number" min={1980} max={2025} placeholder="1980" />
            <span>-</span>
            <input className="w-24 bg-neutral-600 px-2.5 py-1 rounded-md outline-none" onChange={handleChange} name="maxYear" value={formData.maxYear} type="number" min={1980} max={2025} placeholder="2025" />
          </div>
        </section>
        <button type="submit"
          className={`bg-white hover:bg-white/90 transition-all text-black py-1 w-full mt-2 rounded-xs font-medium cursor-pointer animate-fade animate-duration-[500ms] text-sm ${inter.className}`}
        >
          Aplicar
          </button>
        </form>
      </aside>
      <MobileFilter genres={genres} type={type} />
    </>
  )
}