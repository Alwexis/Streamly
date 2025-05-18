import { getMovieById } from "@/lib/db/movies";
import { getSeriesById } from "@/lib/db/series";
import { Play, Plus } from "lucide-react";
import Link from "next/link";
import { geistSans, inter } from "@/lib/fonts";

export default async function FeaturedContent() {
  const featured_movie = await getMovieById("star-wars-episodio-iii-la-venganza-de-los-sith");
  const featured_serie = await getSeriesById("megaman-star-force");
  const featured_content = Math.random() < 0.5 ? featured_movie : featured_serie;

  return (
    <section className="relative w-full h-[70dvh] md:h-[80dvh] overflow-hidden">
      <div className="absolute h-full w-full inset-0">
        <img src={featured_content.background_url} alt={`${featured_content.title}'s cover image`} className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-10% to-neutral-950 to-100% h-full w-full"></div>
      </div>
      <div className="absolute h-full w-full flex items-center z-40 backdrop-blur-xs bg-neutral-950/15 px-4 md:px-6 inset-0 space-x-4 md:space-x-8">
        <img src={featured_content.poster_url} alt={`${featured_content.title}'s poster`}
          className="rounded-md aspect-[2/3] w-32 md:w-48 shadow-md object-cover" />
        <div className="max-w-48 md:max-w-2xl">
          <h1 className={`text-lg md:text-4xl font-bold text-white mb-2 md:mb-4 line-clamp-2 ${geistSans.className}`}>
            {featured_content.title}
          </h1>
          <p className={`text-gray-100 ${inter.className} line-clamp-3 mb-2 md:mb-8`}>
            {featured_content.description}
          </p>
          <section className="flex items-center space-x-8">
            <Link href={`/${"seasons" in featured_content ? "serie" : "movie"}/${featured_content.id}`}>
              <button className={`bg-white hover:bg-white/80 transition-all text-black px-6 py-3 rounded-sm flex items-center gap-2 font-semibold cursor-pointer ${inter.className}`}>
                <Play width={20} height={20} />
                Play
              </button>
            </Link>
            <button className={`bg-white/20 hover:bg-white/30 transition-all text-white px-3 py-3 rounded-full flex items-center gap-2 font-semibold cursor-pointer ${inter.className}`}>
              <Plus width={20} height={20} />
            </button>
          </section>
        </div>
      </div>
    </section>
  )
}