import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-4 h-full">
      <div className="text-yellow-400 flex flex-col flex-1">
        <h2 className=" text-2xl">Welcome to the Landing Page!</h2>
        <p>
          Here you'll be able to browse new movies to watch, and rate the ones
          you've already finished!
        </p>
        <img src={"hello"} />
      </div>
    </div>
  );
}
