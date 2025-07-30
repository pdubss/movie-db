import { createFileRoute } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/supabaseClient";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
});

interface Inputs {
  email: string;
  password: string;
}

function RouteComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submitHandler: SubmitHandler<Inputs> = async (form) => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    console.log(data, error);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label>
          Email:
          <Input {...register("email")} />
        </label>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label>
          Password:
          <Input {...register("password")} />
        </label>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
