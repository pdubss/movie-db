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
  genres: Genre[];
  runtime?: number;
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
  id: number;
  first_air_date: string;
  name: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  backdrop_path?: string | null;
}

export interface TvShowDetails extends TvShow {
  aggregate_credits: {
    cast: Person[];
    crew: Person[];
  };
  popularity: number;
  overview: string;
  status: string;
  tagline: string;
  homepage: string;
  last_air_date: string;
  videos: {
    results: Video[];
  };
  images: {
    backdrops: Image[];
    posters: Image[];
  };
  genres: Genre[];
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    profile_path: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
}

interface TvResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

interface ImageResponse {
  backdrops: Image[];
}
interface Image {
  aspect_ratio: number;
  height: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface GenresResponse {
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

interface PersonResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Person[];
}
export interface Person {
  gender: number;
  biography: string;
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  known_for?: Movie[] | TvShow[];
  combined_credits?: {
    cast:
      | {
          character: string;
          id: number;
          media_type: string;
          popularity: number;
          poster_path: string;
          title: string;

          vote_average: number;
          vote_count: number;
          release_date: string;
        }[]
      | {
          character: string;
          first_air_date: string;
          id: number;
          media_type: string;
          name: string;
          overview: string;
          popularity: number;
          vote_average: number;
          poster_path: string;
          first_credit_air_date: string;
        }[];
    crew:
      | {
          job: string;
          title: string;
          popularity: number;
          department: string;
          poster_path: string;
          release_date: string;
          media_type: string;
          vote_average: number;
          id: number;
        }[]
      | {
          id: number;
          job: string;
          popularity: number;
          department: string;
          poster_path: string;
          first_air_date: string;
          first_credit_air_date: string;
          media_type: string;
          name: string;
          vote_average: number;
        }[];
  };
}
interface CrewMember extends Person {
  job: string;
  department: string;
}

interface CreditsResponse {
  id: number;
  cast: Person[];
  crew: CrewMember[];
}

async function fetchResults(
  category: "movie",
  query: string,
): Promise<MovieResponse>;

async function fetchResults(
  category: "person",
  query: string,
): Promise<PersonResponse>;

async function fetchResults(category: "tv", query: string): Promise<TvResponse>;

async function fetchResults(
  category: CategoryType,
  query: string,
): Promise<PersonResponse | MovieResponse | TvResponse>;

async function fetchResults(category: CategoryType, query: string) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/${category}?query=${query}&language=en`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    },
  );
  return res.data;
}

export const getTrending = async () => {
  const res = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/trending/movie/week?language=en-US';",
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    },
  );
  return res.data;
};

export async function getMovieById(movieId: string) {
  const [movieResponse, videoResponse, imageResponse, creditsResponse] =
    await Promise.all([
      axios.get<MovieInfo>(
        `https://api.themoviedb.org/3/movie/${movieId}
`,
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        },
      ),
      axios.get<VideoResponse>(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        },
      ),
      axios.get<ImageResponse>(
        `https://api.themoviedb.org/3/movie/${movieId}/images`,
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        },
      ),
      axios.get<CreditsResponse>(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
        },
      ),
    ]);

  const trailer = videoResponse.data.results.find(
    (vid) =>
      vid.type === "Trailer" && vid.site === "YouTube" && vid.official === true,
  );

  const director = creditsResponse.data.crew.find(
    (crew) => crew.job === "Director",
  );
  const writers = creditsResponse.data.crew
    .filter((crew) => crew.department === "Writing")
    .slice(0, 4);

  return {
    movie: movieResponse.data,
    videos: videoResponse.data.results,
    trailerKey: trailer?.key,
    director,
    writers,
    images: imageResponse.data.backdrops,
    credits: creditsResponse.data,
  };
}

export async function getMoviesByGenre(genreId: string, page: number) {
  const [movies, genres] = await Promise.all([
    axios.get<MovieResponse>(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
      },
    ),
    axios.get<GenresResponse>(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
      },
    ),
  ]);
  const genre = genres.data.genres.find(
    (genre) => genre.id.toString() === genreId,
  );

  return {
    movies: movies.data,
    genre,
  };
}

export async function fetchMovieGenres() {
  const res = await axios.get<GenresResponse>(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    },
  );
  return res.data;
}

export async function fetchShowGenres() {
  const res = await axios.get<GenresResponse>(
    "https://api.themoviedb.org/3/genre/tv/list?language=en",
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    },
  );
  return res.data;
}

export async function fetchShowsByGenre(genre: string) {
  const [shows] = await Promise.all([
    axios.get<TvResponse>(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
      },
    ),
  ]);

  return {
    shows,
  };
}

export async function getShowsByGenre(genreId: string, page: number) {
  const [shows, genres] = await Promise.all([
    axios.get<TvResponse>(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
      },
    ),
    axios.get<GenresResponse>(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
      },
    ),
  ]);
  const genre = genres.data.genres.find(
    (genre) => genre.id.toString() === genreId,
  );

  return {
    shows: shows.data,
    genre,
  };
}

export async function getShowById(series_id: string) {
  const res = await axios.get<TvShowDetails>(
    `https://api.themoviedb.org/3/tv/${series_id}?append_to_response=videos,images,aggregate_credits
`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    },
  );

  const trailer = res.data.videos.results.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );

  return {
    details: res.data,
    trailer,
  };
}

export async function getPersonById(person_id: string) {
  const res = await axios.get<Person>(
    `https://api.themoviedb.org/3/person/${person_id}?append_to_response=combined_credits
`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
    },
  );
  return res.data;
}

export default fetchResults;
