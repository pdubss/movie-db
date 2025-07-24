import { useQuery } from "@tanstack/react-query";
import fetchResults from "@/queries/queries";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CategoryType, Movie, TvShow, Person } from "@/queries/queries";
import MovieCard from "./ui/MovieCard";
import ShowCard from "./ui/ShowCard";
import PersonCard from "./ui/PersonCard";

const Header = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const [category, setCategory] = useState<CategoryType>("movie");
  const { data } = useQuery({
    queryKey: ["results", category, debouncedQuery],
    queryFn: () => fetchResults(category, debouncedQuery),
    enabled: query.length > 3,
  });

  console.log(data);

  return (
    <nav className="flex h-14 items-center justify-center gap-5 bg-[rgb(17,17,17)] p-4 font-semibold text-white">
      <Link className="hover:text-gray-300" to="/">
        HOMEPAGE
      </Link>
      <Link className="hover:text-gray-300" to="/movies">
        MOVIES
      </Link>
      <Link className="hover:text-gray-300" to="/shows">
        SHOWS
      </Link>

      <div className="relative flex">
        <Select
          value={category}
          onValueChange={(val) => setCategory(val as CategoryType)}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="movie">Movies</SelectItem>
            <SelectItem value="tv">Shows</SelectItem>
            <SelectItem value="person">Actors</SelectItem>
          </SelectContent>
        </Select>
        <Input
          onChange={(e) => setQuery(e.target.value)}
          className="md:w-lg lg:w-xl"
          type="text"
          value={query}
        />
        <button
          onClick={() => setQuery("")}
          className="absolute top-1 right-3 cursor-pointer text-white"
        >
          X
        </button>

        <ul className="absolute top-12 left-0 z-10 w-full">
          {data &&
            data.results?.length > 0 &&
            data.results.slice(0, 4).map((item, index) => {
              if (category === "movie") {
                const movie = item as Movie;
                return (
                  <MovieCard
                    id={movie.id}
                    key={index}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    popularity={movie.popularity}
                    vote_average={movie.vote_average}
                    vote_count={movie.vote_count}
                    release_date={movie.release_date}
                    setQuery={setQuery}
                    genres={movie.genres}
                  />
                );
              } else if (category === "tv") {
                const show = item as TvShow;
                return (
                  <ShowCard
                    id={show.id}
                    name={show.name}
                    key={index}
                    first_air_date={show.first_air_date}
                    poster_path={show.poster_path}
                    vote_average={show.vote_average}
                    vote_count={show.vote_count}
                  />
                );
              } else if (category === "person") {
                const person = item as Person;
                return (
                  <PersonCard
                    name={person.name}
                    key={index}
                    known_for_department={person.known_for_department}
                    profile_path={person.profile_path}
                    gender={person.gender}
                    id={person.id}
                    biography={""}
                  />
                );
              }
            })}
          {data && data?.results.length > 5 ? (
            <li className="h-12 bg-[17,17,17]">
              <button className="hover:cursor-pointer">
                Show all results for "{query}"
              </button>
            </li>
          ) : null}
        </ul>
      </div>
      {/* change to Link once user accounts are implemented */}
      <button className="hover:text-gray-300">WATCHLIST</button>
      <Link className="hover:text-gray-300" to="/about">
        ABOUT
      </Link>
      <button className="cursor-pointer border border-yellow-500 px-2 py-1 hover:text-gray-300">
        Login
      </button>
    </nav>
  );
};
export default Header;
