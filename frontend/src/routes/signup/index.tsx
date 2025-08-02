import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabaseClient";
import { ToastContainer, toast } from "react-toastify";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
});

interface Inputs {
  email: string;
  password: string;
}

function RouteComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = async (form) => {
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Sign up successful");
      navigate({ to: "/" });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ToastContainer position="top-center" />
      <div className="flex h-[25rem] w-[25rem] flex-col border p-4">
        <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
        <form
          className="flex h-full flex-col items-center justify-around"
          onSubmit={handleSubmit(submitHandler)}
        >
          <label className="text-lg font-semibold">
            Email:
            <Input {...register("email")} />
          </label>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <label className="text-lg font-semibold">
            Password:
            <Input {...register("password")} />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            className="w-[5rem] cursor-pointer rounded-lg border p-1 text-lg font-semibold"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
