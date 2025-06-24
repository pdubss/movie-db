import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/queries/queries";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useDebounce } from "use-debounce";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

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
    <nav className="p-2 h-14 bg-[rgb(17,17,17)] text-yellow-400 flex gap-5 items-center">
      <Link to="/">home</Link>
      <Link to="/about">about me</Link>
      <div className="relative mx-auto">
        <input
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white text-black w-sm md:w-md lg:w-2xl"
          type="text"
        />

        <ul className="absolute top-10 left-0 z-10 w-full">
          {data?.Response === "True" &&
            data.Search?.length > 0 &&
            data.Search.map((movie: Movie) => (
              <li
                className="bg-white border mb-1 py-1 px-2 w-full  cursor-pointer"
                key={movie.Title}
              >
                {movie.Title} {movie.Year}
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
};
export default Header;
