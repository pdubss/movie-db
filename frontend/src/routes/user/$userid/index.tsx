import Spinner from "@/components/ui/Spinner";
import useAuthStatus from "@/hooks/useAuthStatus";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/$userid/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, user, isLoggedIn } = useAuthStatus();

  if (isLoading) return <Spinner />;
  if (!isLoggedIn) return <div>You must be logged in to accesss this page</div>;

  if (user) console.log(user);

  return (
    <div>
      <h1 className="text-3xl font-bold">Account</h1>
      <span>{user?.email}</span>
    </div>
  );
}
