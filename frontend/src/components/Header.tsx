import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/queries/queries";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";
import { IMAGE_BASE_URL } from "./ui/Slide";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const { data } = useQuery({
    queryKey: ["movies", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: query.length > 3,
  });

  console.log(data);

  return (
    <nav className="p-4 h-14 bg-[rgb(17,17,17)] text-white flex gap-5 items-center">
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      <div className="relative flex">
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          onChange={(e) => setQuery(e.target.value)}
          className="md:w-lg lg:w-xl"
          type="text"
          value={query}
        />
        <button
          onClick={() => setQuery("")}
          className="cursor-pointer absolute text-white right-3 top-1"
        >
          X
        </button>

        <ul className="absolute top-12 left-0 z-10 w-full">
          {data &&
            data.results?.length > 0 &&
            data.results.slice(0, 4).map((movie, index) => (
              <li
                className="bg-[rgb(17,17,17)] gap-4 border-b-white border-b py-1 px-2 w-full flex cursor-pointer"
                key={index}
              >
                <img
                  className="rounded-md"
                  src={`${IMAGE_BASE_URL}w92${movie.poster_path}`}
                />
                <div className="flex flex-col justify-start">
                  <h3>{movie.title}</h3>
                  <span>{movie.release_date.split("-")[0]}</span>
                  <span>{movie.vote_average.toString().slice(0, 3)}⭐</span>
                  <span>{movie.vote_count} Ratings</span>
                </div>
              </li>
            ))}
          {data && data?.results.length > 5 ? (
            <li className="h-12 bg-[17,17,17]">
              <button className="hover:cursor-pointer">
                Show all results for "{query}"
              </button>
            </li>
          ) : null}
        </ul>
      </div>
      <button className="border px-2 py-1 cursor-pointer border-yellow-500">
        Login
      </button>
    </nav>
  );
};
export default Header;
