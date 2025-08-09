import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabaseClient";
import { ToastContainer, toast } from "react-toastify";

export const Route = createFileRoute("/login/")({
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

  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ToastContainer position="top-center" />
      <div className="flex h-[25rem] w-[25rem] flex-col gap-4 border p-4">
        <h1 className="text-center text-2xl font-semibold">Login</h1>
        <form
          className="flex h-full flex-col items-center justify-around"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-lg font-semibold">
            Email:
            <Input
              {...register("email", {
                required: {
                  value: true,
                  message: "Field cannot be empty",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              type="text"
            />
          </label>
          {errors && (
            <p className="text-center text-red-500">{errors.email?.message}</p>
          )}
          <label className="text-lg font-semibold">
            Password:
            <Input
              {...register("password", {
                required: {
                  value: true,
                  message: "Password field cannot be empty",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
            />
          </label>
          {errors && (
            <p className="text-center text-red-500">
              {errors.password?.message}
            </p>
          )}
          <button
            className="w-[5rem] rounded-lg border p-1 text-lg font-semibold"
            type="submit"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
