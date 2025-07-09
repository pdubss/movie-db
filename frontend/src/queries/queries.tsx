import axios from "axios";

export type CategoryType = "movie" | "tv" | "person";

export interface Movie {
  poster_path: string;
  popularity: number;
  title: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  backdrop_path?: string | undefined;
  overview?: string | undefined;
  id: number;
}

export interface MovieInfo extends Movie {
  runtime: number;
  videos: {
    results: Video[];
  };
}

interface Video {
  id: string;
  iso_3166_1: string;
  iso_639__1: string;
  key: string;
  name: string;
  official: boolean;
  site: string;
  type: string;
}

interface VideoResponse {
  id: number;
  results: Video[];
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface TvShow {
  first_air_date: string;
  name: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  backdrop_path?: string | null;
}

interface TvResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

interface PersonResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Person[];
}
export interface Person {
  known_for_department: string;
  name: string;
  profile_path: string;
  known_for?: Movie[] | TvShow[];
}

async function fetchResults(
  category: "movie",
  query: string
): Promise<MovieResponse>;

async function fetchResults(
  category: "person",
  query: string
): Promise<PersonResponse>;

async function fetchResults(category: "tv", query: string): Promise<TvResponse>;

async function fetchResults(
  category: CategoryType,
  query: string
): Promise<PersonResponse | MovieResponse | TvResponse>;

async function fetchResults(category: CategoryType, query: string) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/${category}?query=${query}`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    }
  );
  return res.data;
}

export const getTrending = async () => {
  const res = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US';",
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    }
  );
  return res.data;
};

export async function getMovieById(movieId: string) {
  const [movieResponse, videoResponse] = await Promise.all([
    axios.get<MovieInfo>(
      `https://api.themoviedb.org/3/movie/${movieId}
`,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
      }
    ),
    axios.get<VideoResponse>(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
      }
    ),
  ]);
  const trailer = videoResponse.data.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );

  return {
    movie: movieResponse.data,
    videos: videoResponse.data.results,
    trailerKey: trailer?.key,
  };
}

export default fetchResults;
