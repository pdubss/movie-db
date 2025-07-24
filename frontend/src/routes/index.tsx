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
    <div className="h-full p-4">
      <div className="flex h-full flex-1 flex-col justify-center gap-4 text-yellow-400">
        <h2 className="text-2xl">Trending Movies</h2>
        {isLoading ? <Spinner /> : <Carousel data={trending?.results} />}
      </div>
    </div>
  );
}
