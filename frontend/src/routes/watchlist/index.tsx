import useAuthStatus from "@/hooks/useAuthStatus";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/watchlist/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, profile } = useAuthStatus();

  if (!user)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <span>
          Please{" "}
          <Link className="text-blue-500 hover:text-blue-300" to="/login">
            Log In
          </Link>{" "}
          to access this page
        </span>
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col items-center gap-6 py-4">
      <h1 className="text-3xl font-bold">Watchlist</h1>
      <ul className="flex flex-col gap-4">
        {profile?.watchlist_movies &&
          profile.watchlist_movies.length > 0 &&
          profile?.watchlist_movies.map((id) => <li>{id}</li>)}
      </ul>
    </div>
  );
}
