import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import { getPersonById } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/people/$personId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { personId } = Route.useParams();
  const { data } = useQuery({
    queryKey: ["personDetails", personId],
    queryFn: () => getPersonById(personId),
  });

  if (data) console.log(data);

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-semibold">{data?.name}</h1>
      <div className="flex gap-2">
        <img
          className="rounded-md"
          src={`${IMAGE_BASE_URL}w342${data?.profile_path}`}
        />

        {data && data.known_for_department === "Acting" && (
          <ul className="grid xl:grid-cols-5">
            {data.combined_credits?.cast
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 5)
              .map((role) => (
                <li>
                  <img src={`${IMAGE_BASE_URL}w185${role.poster_path}`} />
                  <span>{role.character}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
