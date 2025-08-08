import { createFileRoute } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
});

interface Inputs {
  email: string;
  password: string;
  name: string;
}

function RouteComponent() {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = async (form) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Please check your email for a verification link");
        console.log(data);
      }
      if (!data.user) throw new Error("No user returned from signup");

      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          user_id: data.user.id,
          name: form.name,
        });
        if (profileError) throw profileError;
      }
    } catch (error) {
      console.error(error);
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
          <div className="relative">
            <label className="text-lg font-semibold">
              Password:
              <Input
                {...register("password")}
                type={showPass ? "text" : "password"}
              />
            </label>
            <button
              type="button"
              onClick={() => setShowPass((val) => !val)}
              className="absolute right-2 bottom-2 cursor-pointer"
            >
              {showPass ? (
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
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
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
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <label>
            First Name
            <Input
              {...register("name", {
                required: true,
                minLength: {
                  value: 1,
                  message: "Name cannot be empty",
                },
              })}
            />
          </label>

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
