import useAuthStatus from "@/hooks/useAuthStatus";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/watchlist/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoggedIn } = useAuthStatus();

  if (!isLoggedIn)
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
    <div className="flex h-full w-full flex-col items-center py-4">
      <h1 className="text-3xl font-bold">Watchlist</h1>
      <p>Come back once the backend is implemented! ETA:2036!</p>
    </div>
  );
}
