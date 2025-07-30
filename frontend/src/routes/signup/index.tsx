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
    <div>
      <ToastContainer position="top-center" />
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
