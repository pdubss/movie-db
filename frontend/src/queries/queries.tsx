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

export default fetchResults;
