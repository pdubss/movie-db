import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/queries/queries";
import Spinner from "@/components/ui/Spinner";
import Carousel from "@/components/ui/Carousel";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: trending, isLoading } = useQuery({
    queryKey: ["latest"],
    queryFn: getTrending,
  });
  if (trending) {
    console.log(trending);
  }

  return (
    <div className="p-4 h-full">
      <div className="text-yellow-400 flex flex-col flex-1 gap-4">
        <h2 className=" text-2xl">Welcome to the Landing Page!</h2>
        <p>
          Here you'll be able to browse new movies to watch, and rate the ones
          you've already finished!
        </p>

        {isLoading ? <Spinner /> : <Carousel trending={trending?.results} />}
      </div>
    </div>
  );
}
