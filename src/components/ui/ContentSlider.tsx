import { geistSans, inter } from "@/lib/fonts";
import Link from "next/link";
import { ContentBase } from "@/lib/types";
import { ArrowRight, Play, Star } from "lucide-react";

type ContentGalleryProps<T extends ContentBase> = {
  title: string;
  type: "movie" | "serie";
  callback: () => Promise<T[]>;
  viewMoreTitle?: string;
  viewMoreSlug?: string;
}

export default async function ContentGallery<T extends ContentBase>({ title, type, callback, viewMoreSlug, viewMoreTitle }: ContentGalleryProps<T>) {
  const data = await callback();

  return (
    <section className="px-4 md:px-6 max-w-dvw">
      <h2 className={`text-2xl font-semibold text-white mb-4 ${geistSans.className}`}>
        {title}
      </h2>
      {
        data.length > 0 ? (
          <div className="flex items-center gap-4 pb-2.5 overflow-x-auto [&::-webkit-scrollbar-thumb]:bg-neutral-900 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-2">
            {
              data.map((item) => {
                return (
                  <Link href={`/${type}s/${item.id}`} key={item.id}>
                    <article className="relative group/article hover:-translate-y-2 transition-all w-48 h-72 max-h-72">
                      <img src={item.poster_url} alt={`${item.title} poster`} loading="lazy" className="absolute inset-0 rounded-md aspect-[2/3] w-48 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-neutral-950/50 via-80% to-neutral-950 to-100% h-full w-full"></div>
                      <div className="absolute inset-0 rounded-md bg-black/60 opacity-0 group-hover/article:opacity-100 transition-all h-full w-full"></div>
                      <div className="px-3 py-3 absolute top-0 w-full opacity-0 group-hover/article:opacity-100 transition-all">
                        <div className="h-full w-fit flex items-center px-2 py-0.5 bg-red-600 text-sm text-white rounded-sm space-x-1">
                          <Star width={12} height={12} />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                      <div className="px-3 py-3 absolute bottom-0 w-full">
                        <h4 className="text-white font-semibold line-clamp-1 group-hover/article:line-clamp-2">{item.title}</h4>
                        <section className={`${inter.className} text-xs space-x-2`}>
                          <span className="text-green-500">{item.release_year}</span>
                          <span className="text-gray-400 text-xs">
                            { "duration_minutes" in item &&
                              `${item.duration_minutes} min`
                            }
                            { "season_count" in item &&
                              `${item.season_count} ${item.season_count === 1 ? "Season" : "Seasons"}`
                            }
                          </span>
                        </section>
                        <section className="hidden group-hover/article:flex animate-fade animate-duration-[500ms] space-x-1 mt-2">
                          { item.genres && item.genres.slice(0, 2).map((genre) => {
                            return (
                              <span key={`${item.id}-${genre.id}`} className="bg-white/10 px-1.5 py-1 rounded-sm text-gray-200 text-xs">{genre.name}</span>
                            )
                          }) }
                        </section>
                        <button type="button" title={`Reproducir ${item.title}`}
                          className={`hidden group-hover/article:flex bg-white hover:bg-white/90 transition-all text-black py-1 w-full mt-2 rounded-xs justify-center items-center gap-1 font-medium cursor-pointer animate-fade animate-duration-[500ms] text-sm ${inter.className}`}>
                          <Play width={12} height={12} />
                          Reproducir
                        </button>
                      </div>
                    </article>
                  </Link>
                )
              })
            }
            {
              viewMoreSlug && (
                <Link href={viewMoreSlug}>
                  <article className="relative flex flex-col items-center justify-center text-white bg-neutral-900/50 hover:bg-neutral-900 transition-all w-48 h-72 max-h-72 px-3 py-3 text-center rounded-md">
                    <ArrowRight width={32} height={32} />
                    <h4>Ver más de <strong>{viewMoreTitle}</strong></h4>
                  </article>
                </Link>
              )
            }
          </div>
        ) : (
          <p className="text-white">No data found</p>
        )
      }
    </section>
  )
}