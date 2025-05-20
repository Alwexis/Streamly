import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Movie, QueryParams } from "@/lib/types";

export async function getAllMovies(): Promise<Movie[]> {
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase.rpc('get_all_movies_preview');
    if (error) throw error
    return data;
}

export async function getMovieById(id: string): Promise<Movie> {
    if (!id || id === "") throw new Error("ID is required");

    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase.rpc('get_movie_full', { movie_id_arg: id })
    if (error) throw error
    return data;
}

export async function getMoviesByAmount(amount: number): Promise<Movie[]> {
    if (amount <= 0) throw new Error("Amount must be greater than 0");

    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase.rpc('get_movies_preview', { limit_count: amount })
    if (error) throw error
    return data;
}

export async function getAllMoviesByGenre(genres: number[]): Promise<Movie[]> {
    if (genres.length === 0) throw new Error("Genres array is empty.");

    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase.rpc('get_movies_by_genres', { genres_filter: genres })
    if (error) throw error
    return data;
}

export async function getMoviesByGenreAndAmount(genres: number[], amount: number): Promise<Movie[]> {
    if (genres.length === 0) throw new Error("Genres array is empty");
    if (amount <= 0) throw new Error("Amount must be greater than 0");

    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase.rpc('get_movies_by_genres_limited', { genres_filter: genres, limit_count: amount });
    if (error) throw error
    return data;
}

// query: "nombre" | "año" | "género"
export async function getMoviesByQuery(query?: QueryParams): Promise<Movie[] | undefined> {
    if (!query) return;

    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase
        .rpc('get_movies_filtered', {
            title_filter: query.name,
            genres_filter: query.genre,
            min_year: query.minyear,
            max_year: query.maxyear,
            limit_val: query.limit,
            offset_val: (query.page || 1 - 1) * (query.limit || 30)
        })
    if (error) throw error
    return data;
}
