import { createClient } from "../supabase/server"
import { cookies } from "next/headers"
import { Genre } from "../types"

export async function getGenres(id: string, type: "movies" | "series"): Promise<Genre[]> {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const relationTable = type === "movies" ? "movie_genres" : "series_genres";
  const relationField = type === "movies" ? "movie_id" : "series_id";

  const { data: relations, error: relationError } = await supabase
    .from(relationTable)
    .select("genre_id")
    .eq(relationField, id);
  if (relationError) throw relationError;
  const genreIds = relations.map(rel => rel.genre_id);
  if (genreIds.length === 0) return [];
  const { data: genres, error: genresError } = await supabase
    .from("genres")
    .select("id, name")
    .in("id", genreIds);
  if (genresError) throw genresError;
  return genres ?? [];
}

export async function getAllGenres(): Promise<Genre[]> {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const { data: genres, error: genresError } = await supabase
        .from("genres")
        .select("id, name")
    if (genresError) throw genresError;
    return genres ?? [];
}

