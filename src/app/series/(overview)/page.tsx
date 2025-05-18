import Filters from "@/components/ui/filters/Filters";
import { getAllGenres } from "@/lib/db/all"
import { geistSans } from "@/lib/fonts";
import ContentGallery from "@/components/ui/ContentGallery";
import { Metadata } from "next";
import { getSeriesByQuery } from "@/lib/db/series";

export const metadata: Metadata = {
  title: 'Series',
};

type PageProps = {
  searchParams?: Promise<{
    name?: string;
    minyear?: number;
    maxyear?: number;
    genre?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const params = { ...rawParams, genre: rawParams?.genre?.split(",").map(Number) }
  const genres = await getAllGenres();

  return (
    <main className="px-4 md:px-6 py-8">
      <h1 className={`text-2xl font-bold text-white ${geistSans.className} pb-6`}>
        Series
      </h1>
      <section className="grid grid-cols-1 grid-rows-[auto_1fr] space-y-4 md:space-y-0 md:grid-rows-none md:grid-cols-[auto_1fr]">
        <Filters genres={genres} type="series" />
        <ContentGallery type="serie" callback={() => getSeriesByQuery(params)} />
      </section>
    </main>
  )
}
