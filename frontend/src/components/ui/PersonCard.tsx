import type { Person } from "@/queries/queries";
import { IMAGE_BASE_URL } from "./Slide";
import { Link } from "@tanstack/react-router";

interface PersonCardProps extends Person {
  key: number;
}

function PersonCard({
  id,
  name,
  profile_path,
  known_for_department,
  key,
}: PersonCardProps) {
  return (
    <li
      className="w-full border-b border-b-white bg-[rgb(17,17,17)] px-2 py-1"
      key={key}
    >
      <Link
        to="/people/$personId"
        params={{ personId: id.toString() }}
        className="flex gap-4"
      >
        <img
          className="rounded-md"
          src={`${IMAGE_BASE_URL}w92${profile_path}`}
        />
        <div className="flex flex-col justify-start">
          <h2 className="text-xl">{name}</h2>
          <span>Known For: {known_for_department}</span>
        </div>
      </Link>
    </li>
  );
}

export default PersonCard;
