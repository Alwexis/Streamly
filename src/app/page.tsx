import Navbar from "@/components/ui/Navbar";
import FeaturedContent from "@/components/ui/FeaturedContent";
import ContentGallery from "@/components/ui/ContentSlider";
import { getMoviesByAmount, getMoviesByGenreAndAmount } from "@/lib/db/movies";
import { getSeriesByAmount, getSeriesByGenreAndAmount } from "@/lib/db/series";

export default function Page() {
  return (
    <main className="grid grid-rows-[auto_1fr_auto] min-h-screen pb-8 space-y-8">
      {/* Feature movie or serie */}
      <FeaturedContent />
      <ContentGallery title="Películas" type="movie" viewMoreTitle="Películas" viewMoreSlug="/movies/" callback={() => getMoviesByAmount(6)} />
      <ContentGallery title="Películas Animadas" type="movie" viewMoreTitle="Películas Animadas" viewMoreSlug="/movies?genre=3,4" callback={() => getMoviesByGenreAndAmount([4, 3], 6)} />
      <ContentGallery title="Películas de Acción" type="movie" viewMoreTitle="Películas de Acción" viewMoreSlug="/movies?genre=1" callback={() => getMoviesByGenreAndAmount([1], 6)} />
      <ContentGallery title="Películas de Ciencia Ficción" type="movie" viewMoreTitle="Películas de Ciencia Ficción" viewMoreSlug="/movies?genre=2" callback={() => getMoviesByGenreAndAmount([2], 6)} />
      <ContentGallery title="Series" type="serie" viewMoreTitle="Series" viewMoreSlug="/series?genre=1" callback={() => getSeriesByAmount(6)} />
      <ContentGallery title="Series Animadas" type="serie" viewMoreTitle="Series Animadas" viewMoreSlug="/series?genre=3,4" callback={() => getSeriesByGenreAndAmount([4, 3], 6)} />
      <ContentGallery title="Series de Acción" type="serie" viewMoreTitle="Series de Acción" viewMoreSlug="/series?genre=1" callback={() => getSeriesByGenreAndAmount([1], 6)} />
      <ContentGallery title="Series de Ciencia Ficción" type="serie" viewMoreTitle="Series de Ciencia Ficción" viewMoreSlug="/series?genre=2" callback={() => getSeriesByGenreAndAmount([2], 6)} />
    </main>
  );
}
