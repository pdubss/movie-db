import { IMAGE_BASE_URL } from "@/components/ui/Slide";
import { getPersonById } from "@/queries/queries";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl font-semibold">{data?.name}</h1>
      <div className="flex gap-2">
        <img
          className="max-h-[20rem] rounded-md"
          src={`${IMAGE_BASE_URL}w342${data?.profile_path}`}
        />
      </div>
      <div className="flex flex-col gap-6">
        {data?.combined_credits?.cast.length && (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer border border-white px-2">
                Actor
              </AccordionTrigger>
              {data?.combined_credits?.cast.map((credit, i) => (
                <AccordionContent
                  key={i}
                  className={`${data.combined_credits?.cast.find((cast) => cast.id) && i !== data.combined_credits.cast.filter((credit) => credit.id).length - 1 ? "border-b" : ""} flex justify-between px-4 py-2 text-balance`}
                >
                  <div className="flex gap-2">
                    {" "}
                    <img
                      className="rounded-lg"
                      src={`${IMAGE_BASE_URL}w45${credit.poster_path}`}
                    />
                    <div>
                      <span className="flex flex-col gap-2">
                        {" "}
                        {"title" in credit ? credit.title : credit.name}
                      </span>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-4 fill-yellow-300"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            {credit.vote_average === 0
                              ? "N/A"
                              : credit.vote_average.toString().slice(0, 4)}
                          </span>{" "}
                        </div>

                        <span>
                          {credit.media_type === "movie" ? "Film" : "TV Series"}
                        </span>
                      </div>
                      <span>{credit.character}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      {"release_date" in credit
                        ? credit.release_date.split("-")[0]
                        : credit.first_credit_air_date.split("-")[0]}
                    </span>
                    <Link
                      to={
                        credit.media_type === "movie"
                          ? "/movies/$movieId"
                          : "/shows/$showId"
                      }
                      params={{
                        showId: credit.id.toString(),
                        movieId: credit.id.toString(),
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                        />
                      </svg>
                    </Link>
                  </div>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        )}

        {data?.combined_credits?.crew.filter(
          (credit) => credit.department === "Directing",
        ).length && (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer border px-2">
                Director
              </AccordionTrigger>
              {data.combined_credits.crew
                .filter((role) => role.department === "Directing")
                .map((credit, i) => (
                  <AccordionContent
                    key={i}
                    className={`${data.combined_credits?.crew.find((crew) => crew.department === "Directing") && i !== data.combined_credits.crew.filter((role) => role.department === "Directing").length - 1 ? "border-b" : ""} flex justify-between px-4 py-2`}
                  >
                    <div className="flex gap-2">
                      <img
                        className="rounded-lg"
                        src={`${IMAGE_BASE_URL}w45${credit.poster_path}`}
                      />
                      <div className="flex flex-col">
                        <span>
                          {"title" in credit ? credit.title : credit.name}
                        </span>
                        <div className="flex gap-3">
                          <div className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-4 fill-yellow-300"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              {credit.vote_average === 0
                                ? "N/A"
                                : credit.vote_average.toString().slice(0, 4)}
                            </span>
                          </div>
                          <span>
                            {credit.media_type === "movie"
                              ? "Film"
                              : "TV Series"}
                          </span>
                        </div>
                        <span>{credit.job}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {"title" in credit
                          ? credit.release_date
                          : credit.first_credit_air_date}
                      </span>
                      <Link
                        to={
                          "title" in credit
                            ? "/movies/$movieId"
                            : "/shows/$showId"
                        }
                        params={{
                          movieId: credit.id.toString(),
                          showId: credit.id.toString(),
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
        )}

        {data?.combined_credits?.crew.find(
          (crew) => crew.department === "Writing",
        ) && (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer border px-2">
                Writer
              </AccordionTrigger>
              {data.combined_credits.crew
                .filter((crew) => crew.department === "Writing")
                .map((credit, i) => (
                  <AccordionContent
                    key={i}
                    className={`${data.combined_credits?.crew.find((crew) => crew.department === "Writing") && i !== data.combined_credits.crew.filter((crew) => crew.department === "Writing").length - 1 ? "border-b" : ""} flex justify-between px-4 py-2`}
                  >
                    <div className="flex gap-2">
                      <img
                        className="rounded-lg"
                        src={`${IMAGE_BASE_URL}w45${credit.poster_path}`}
                      />
                      <div className="flex flex-col">
                        <span>
                          {"title" in credit ? credit.title : credit.name}
                        </span>
                        <div className="flex gap-3">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-4 fill-yellow-300"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              {credit.vote_average === 0
                                ? "N/A"
                                : credit.vote_average.toString().slice(0, 4)}
                            </span>
                          </div>
                          <span>
                            {credit.media_type === "movie"
                              ? "Film"
                              : "TV Series"}
                          </span>
                        </div>
                        <span>{credit.job}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {"title" in credit
                          ? credit.release_date.split("-")[0]
                          : credit.first_credit_air_date.split("-")[0]}
                      </span>
                      <Link
                        to={
                          "title" in credit
                            ? "/movies/$movieId"
                            : "/shows/$showId"
                        }
                        params={{
                          showId: credit.id.toString(),
                          movieId: credit.id.toString(),
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
        )}

        {data?.combined_credits?.crew.find(
          (crew) => crew.department === "Production",
        ) && (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="cursor-pointer border px-2">
                Producer
              </AccordionTrigger>
              {data.combined_credits.crew
                .filter((crew) => crew.department === "Production")
                .map((credit, i) => (
                  <AccordionContent
                    key={i}
                    className={`${
                      data?.combined_credits?.crew.find(
                        (crew) => crew.department === "Production",
                      ) &&
                      i !==
                        data.combined_credits?.crew.filter(
                          (crew) => crew.department === "Production",
                        ).length -
                          1
                        ? "border-b"
                        : ""
                    } flex justify-between px-4 py-2`}
                  >
                    <div className="flex gap-2">
                      <img
                        className="rounded-lg"
                        src={`${IMAGE_BASE_URL}w45${credit.poster_path}`}
                      />
                      <div className="flex flex-col">
                        <span>
                          {"title" in credit ? credit.title : credit.name}
                        </span>
                        <div className="flex gap-3">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-4 fill-yellow-300"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>
                              {credit.vote_average === 0
                                ? "N/A"
                                : credit.vote_average.toString().slice(0, 4)}
                            </span>
                          </div>
                          <span>
                            {credit.media_type === "movie"
                              ? "Film"
                              : "TV Series"}
                          </span>
                        </div>
                        <span>{credit.job}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>
                        {"title" in credit
                          ? credit.release_date
                          : credit.first_credit_air_date}
                      </span>
                      <Link
                        to={
                          "title" in credit
                            ? "/movies/$movieId"
                            : "/shows/$showId"
                        }
                        params={{
                          movieId: credit.id.toString(),
                          showId: credit.id.toString(),
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </AccordionContent>
                ))}
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
}
