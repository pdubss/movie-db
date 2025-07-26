import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/watchlist/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full w-full flex-col items-center py-4">
      <h1 className="text-3xl font-bold">Watchlist</h1>
      <p>Come back once the backend is implemented! ETA:2036!</p>
    </div>
  );
}
