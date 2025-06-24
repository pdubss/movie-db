import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/queries/queries";
import Spinner from "@/components/ui/Spinner";
import Carousel from "@/components/ui/Carousel";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  return (
    <div className="p-4 h-full">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="text-yellow-400 flex flex-col flex-1">
          <h2 className=" text-2xl">Welcome to the Landing Page!</h2>
          <p>
            Here you'll be able to browse new movies to watch, and rate the ones
            you've already finished!
          </p>
          <Carousel />

          <p>{data.Title}</p>
          <img className="h-[445px] w-[300px]" src={data.Poster} />
        </div>
      )}
    </div>
  );
}
