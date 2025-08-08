import { useQuery } from "@tanstack/react-query";
import fetchResults from "@/queries/queries";
import { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { CategoryType, Movie, TvShow, Person } from "@/queries/queries";
import MovieCard from "./ui/MovieCard";
import ShowCard from "./ui/ShowCard";
import PersonCard from "./ui/PersonCard";
import useAuthStatus from "@/hooks/useAuthStatus";
import { supabase } from "@/supabaseClient";

const Header = () => {
  const { isLoggedIn } = useAuthStatus();
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  // const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const [category, setCategory] = useState<CategoryType>("movie");
  const { data } = useQuery({
    queryKey: ["results", category, debouncedQuery],
    queryFn: () => fetchResults(category, debouncedQuery),
    enabled: query.length > 3,
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error(error.message);
        return null;
      }

      setCurrentId(user?.id);
    };

    getUserInfo();
  }, [isLoggedIn]);

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
      <Link to="/watchlist" className="hover:text-gray-300">
        WATCHLIST
      </Link>
      <Link className="hover:text-gray-300" to="/about">
        ABOUT
      </Link>
      {isLoggedIn && currentId ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span>Placeholder Name</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to="/user/$userid" params={{ userid: currentId }}>
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/user/$userid/ratings" params={{ userid: currentId }}>
                Your Ratings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link className="px-2 py-1" to="/signup">
            SIGNUP
          </Link>
          <Link
            to="/login"
            className="cursor-pointer px-2 py-1 hover:text-gray-300"
          >
            LOGIN
          </Link>
        </>
      )}
    </nav>
  );
};
export default Header;
