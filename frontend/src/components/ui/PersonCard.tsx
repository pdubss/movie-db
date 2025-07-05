import type { Person } from "@/queries/queries";
import { IMAGE_BASE_URL } from "./Slide";

interface PersonCardProps extends Person {
  key: number;
}

function PersonCard({
  name,
  profile_path,
  known_for_department,
  key,
}: PersonCardProps) {
  return (
    <li
      className="bg-[rgb(17,17,17)] gap-4 border-b-white border-b py-1 px-2 w-full flex cursor-pointer"
      key={key}
    >
      <img className="rounded-md" src={`${IMAGE_BASE_URL}w92${profile_path}`} />
      <div className="flex flex-col justify-start">
        <h2 className="text-xl">{name}</h2>
        <span>Known For:{known_for_department}</span>
      </div>
    </li>
  );
}

export default PersonCard;
