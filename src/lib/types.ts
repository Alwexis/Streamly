interface ContentBase {
    id: string;
    title: string;
    poster_url: string;
    background_url: string;
    description: string;
    release_year: number;
    rating: number;
    genres: Genre[];
    created_at?: string;
}

// Movie
interface Movie extends ContentBase {
    duration_minutes: number;
    video_url: string;
}

// Serie
interface Serie extends ContentBase {
    seasons?: Season[];
}

interface Season {
    id: string;
    season_number: number;
    episodes?: Episode[];
}

interface Episode {
    id: string;
    episode_number: number;
    title: string;
    video_url: string;
    thumbnail_url: string;
}

interface Genre {
    id: number;
    name: string;
}

interface QueryParams {
    name?: string;
    minyear?: number;
    maxyear?: number;
    genre?: number[];
}

export type { ContentBase, Movie, Serie, Season, Episode, Genre, QueryParams };
