import { ContentBase } from "@/lib/types";
import { Play, Star } from "lucide-react";
import Link from "next/link";
import { inter } from "@/lib/fonts";

type ContentGalleryProps = {
  type?: "movie" | "serie";
  callback: () => Promise<ContentBase[] | undefined>;
}

export default async function ContentGallery({ type, callback }: ContentGalleryProps) {
  const data = await callback();
  if (!data) return null;

  return (
    <section className="max-w-dvw">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4">
        {
          data.map((item) => {
            return (
              <Link href={`/${type}s/${item.id}`} key={item.id}>
                <article className="relative group/article w-32 h-64 max-h-64 md:w-48 md:h-72 md:max-h-72">
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
                        {"duration_minutes" in item &&
                          `${item.duration_minutes} min`
                        }
                        {"season_count" in item &&
                          `${item.season_count} ${item.season_count === 1 ? "Season" : "Seasons"}`
                        }
                      </span>
                    </section>
                    <section className="hidden group-hover/article:flex animate-fade animate-duration-[500ms] space-x-1 mt-2">
                      {item.genres && item.genres.slice(0, 2).map((genre) => {
                        return (
                          <span key={`${item.id}-${genre.id}`} className="bg-white/10 px-1.5 py-1 rounded-sm text-gray-200 text-xs">{genre.name}</span>
                        )
                      })}
                    </section>
                    <button type="button" title={`Play ${item.title}`}
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
      </div>
    </section>
  )
}