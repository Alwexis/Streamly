import FeaturedContent from "@/components/ui/content/FeaturedContent";
import ContentGallery from "@/components/ui/content/slider/ContentSlider";
import SliderSkeleton from "@/components/ui/content/slider/SliderSkeleton";
import { getMoviesByAmount, getMoviesByGenreAndAmount } from "@/lib/db/movies";
import { getSeriesByAmount, getSeriesByGenreAndAmount } from "@/lib/db/series";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="grid grid-rows-[auto_1fr_auto] min-h-screen pb-8 space-y-8">
      {/* Feature movie or serie */}
      <FeaturedContent />
      <Suspense fallback={<SliderSkeleton title="Películas" />}>
        <ContentGallery title="Películas" type="movie" viewMoreTitle="Películas" viewMoreSlug="/movies/" callback={() => getMoviesByAmount(6)} />
      </Suspense>
      <Suspense fallback={<SliderSkeleton title="Películas Animadas" />}>
        <ContentGallery title="Películas Animadas" type="movie" viewMoreTitle="Películas Animadas" viewMoreSlug="/movies?genre=3,4" callback={() => getMoviesByGenreAndAmount([4, 3], 6)} />
      </Suspense>
      <Suspense fallback={<SliderSkeleton title="Películas de Acción" />}>
        <ContentGallery title="Películas de Acción" type="movie" viewMoreTitle="Películas de Acción" viewMoreSlug="/movies?genre=1" callback={() => getMoviesByGenreAndAmount([1], 6)} />
      </Suspense>
      <Suspense fallback={<SliderSkeleton title="Películas de Ciencia Ficción" />}>
        <ContentGallery title="Películas de Ciencia Ficción" type="movie" viewMoreTitle="Películas de Ciencia Ficción" viewMoreSlug="/movies?genre=2" callback={() => getMoviesByGenreAndAmount([2], 6)} />
      </Suspense>
      <Suspense fallback={<SliderSkeleton title="Series" />}>
        <ContentGallery title="Series" type="serie" viewMoreTitle="Series" viewMoreSlug="/series?genre=1" callback={() => getSeriesByAmount(6)} />
      </Suspense>
      <Suspense fallback={<SliderSkeleton title="Series Animadas" />}>
        <ContentGallery title="Series Animadas" type="serie" viewMoreTitle="Series Animadas" viewMoreSlug="/series?genre=3,4" callback={() => getSeriesByGenreAndAmount([4, 3], 6)} />
      </Suspense>
      <Suspense fallback={<SliderSkeleton title="Series de Acción" />}>
        <ContentGallery title="Series de Acción" type="serie" viewMoreTitle="Series de Acción" viewMoreSlug="/series?genre=1" callback={() => getSeriesByGenreAndAmount([1], 6)} />
      </Suspense>
      <Suspense fallback={<SliderSkeleton title="Series de Ciencia Ficción" />}>
        <ContentGallery title="Series de Ciencia Ficción" type="serie" viewMoreTitle="Series de Ciencia Ficción" viewMoreSlug="/series?genre=2" callback={() => getSeriesByGenreAndAmount([2], 6)} />
      </Suspense>
    </main>
  );
}
