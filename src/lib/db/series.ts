import { createClient } from "../supabase/server"
import { cookies } from "next/headers"
import { QueryParams, Serie } from "../types"

export async function getAllSeries(): Promise<Serie[]> {
    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    //! const { data, error } = await supabase
    //!     .from("series")
    //!     .select("*")
    //!     .order("release_year", { ascending: false })
    const { data, error } = await supabase.rpc('get_all_series_with_season_count')
    if (error) throw error
    return data;
}

export async function getSeriesById(id: string): Promise<Serie> {
    if (!id || id === "") throw new Error("ID is required.");

    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    //! const { data, error } = await supabase
    //!     .from("series")
    //!     .select("*")
    //!     .eq("id", id)
    //!     .single();
    const { data, error } = await supabase.rpc('get_series_full',   { serie_id_arg: id });
    if (error) throw error;
    //! const seasons = await _getSeasons(id);
    //! seasons.forEach(season => {
    //!     season.episodes?.sort((a, b) => a.episode_number - b.episode_number);
    //! });
    //! const genres = await getGenres(id, "series");
    //! const transformedData: Serie = {
    //!     ...data,
    //!     genres,
    //!     seasons
    //! };
    return data;
}

export async function getSeriesByAmount(amount: number): Promise<Serie[]> {
    if (amount <= 0) throw new Error("Amount must be greater than 0.");

    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase.rpc('get_series_preview', { limit_count: 5 });
    //! const { data, error } = await supabase
    //!     .from("series")
    //!     .select("*")
    //!     .order("release_year", { ascending: false })
    //!     .limit(amount);
    if (error) throw error;
    //! const series = await Promise.all(data.map(async (serie: Serie) => ({
    //!     ...serie,
    //!     seasons: await _getSeasons(serie.id),
    //!     genres: await getGenres(serie.id, "series")
    //! })));
    return data;
}

export async function getAllSeriesByGenre(genres: number[]): Promise<Serie[]> {
    if (genres.length === 0) throw new Error("Genres array is empty.");

    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase.rpc('get_series_by_genres', { genres_filter: genres })
    if (error) throw error
    return data;
}

export async function getSeriesByGenreAndAmount(genres: number[], amount: number): Promise<Serie[]> {
    if (genres.length === 0) throw new Error("Genres array is empty");
    if (amount <= 0) throw new Error("Amount must be greater than 0");

    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase.rpc('get_series_by_genres_limited', { genres_filter: genres, limit_count: amount });
    if (error) throw error
    return data;
}

// query: "nombre" | "año" | "género"
export async function getSeriesByQuery(query?: QueryParams): Promise<Serie[] | undefined> {
    if (!query) return;

    const cookieStore = cookies()
    const supabase = await createClient(cookieStore)
    const { data, error } = await supabase
        .rpc('get_series_filtered', {
            title_filter: query.name,
            genres_filter: query.genre,
            min_year: query.minyear,
            max_year: query.maxyear
        })
    if (error) throw error
    return data;
}
