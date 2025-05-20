import Filters from "@/components/ui/filters/Filters";
import { getAllGenres } from "@/lib/db/all"
import { geistSans } from "@/lib/fonts";
import ContentGallery from "@/components/ui/content/gallery/ContentGallery";
import { Metadata } from "next";
import { getSeriesByQuery } from "@/lib/db/series";
import { getSlugsForPagination } from "@/lib/util";
import { Suspense } from "react";
import GallerySkeleton from "@/components/ui/content/gallery/GallerySkeleton";

export const metadata: Metadata = {
  title: 'Series',
};

type PageProps = {
  searchParams?: Promise<{
    name?: string;
    minyear?: number;
    maxyear?: number;
    genre?: string;
    page?: number;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const [rawParams, genres] = await Promise.all([
    searchParams,
    getAllGenres()
  ]);
  const params = { ...rawParams, genre: rawParams?.genre?.split(",").map(Number), page: Number(rawParams?.page) || 1 }
  const { nextPageSlug, previousPageSlug } = getSlugsForPagination("series", params)

  return (
    <main className="px-4 md:px-6 py-8">
      <h1 className={`text-2xl font-bold text-white ${geistSans.className} pb-6`}>
        Series
      </h1>
      <section className="grid grid-cols-1 grid-rows-[auto_1fr] space-y-4 md:space-y-0 md:grid-rows-none md:grid-cols-[auto_1fr]">
        <Filters genres={genres} type="series" />
        <Suspense fallback={<GallerySkeleton />}>
          <ContentGallery type="serie" callback={() => getSeriesByQuery(params)} pagination={ { current: params.page || 1, next: nextPageSlug, previous: previousPageSlug } }  />
        </Suspense>
      </section>
    </main>
  )
}
