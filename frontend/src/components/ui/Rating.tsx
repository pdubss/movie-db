import type { User } from "@supabase/supabase-js";
import Stars from "./Stars";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "@/supabaseClient";

interface RatingProps {
  type: "show" | "movie";
  title: string;
  setRating: (x: number) => void;
  rating: number | null;
  user: User | null;
}

function Rating({ type, title, setRating, rating, user }: RatingProps) {
  const submitRatingHandler = async (rating: number | null) => {
    if (!user) {
      return toast.error("Must be logged in to rate");
    }
    if (!rating) {
      return toast.error("Select a rating before submitting");
    }
    try {
      if (type === "movie") {
        const { data: movieRatings, error: movieErrors } = await supabase
          .from("profiles")
          .select("movie_ratings")
          .eq("user_id", user.id);
      }
    } catch (error) {
      console.error(error);
    }

    toast.success("Rating submitted!");
  };

  return (
    <div className="flex h-[15rem] w-[40rem] flex-col items-center justify-around rounded-md bg-[#282828]">
      <ToastContainer position="top-center" />
      <h3 className="font-semibold">RATE THIS</h3>
      <h2 className="text-xl font-semibold">{title}</h2>
      <Stars rating={rating} setRating={setRating} />
      <button
        onClick={() => submitRatingHandler(rating ? rating : null)}
        className={`cursor-pointer rounded-full border px-3 py-1 ${rating ? "bg-yellow-400 text-black" : "bg-red-500"}`}
      >
        Rate
      </button>
    </div>
  );
}

export default Rating;
