import axios from "axios";

export interface Movie {
  poster_path: string;
  popularity: number;
  overview: string;
  title: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  backdrop_path: string;
}

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const search = async (category: string, query: string) => {
  const res = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/${category}?query=${query}`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    }
  );
  return res.data;
};

export const getTrending = async () => {
  const res = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US';",
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    }
  );
  return res.data;
};

console.log(import.meta.env.VITE_TMDB_KEY);
