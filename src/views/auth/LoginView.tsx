import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: ""
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const handleLogin = (formData: UserLoginForm) => {};

  return (
    <>
      <h1 className="text-3xl font-black mb-5 text-center text-white">
        Iniciar Sesión
      </h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        noValidate
        className="bg-white w-full p-5 rounded flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <input
            id="email"
            type="email"
            placeholder="Correo Electronico (e.j. user@example.com)"
            className="w-full input"
            {...register("email", {
              required: "El correo electronico es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electronico no válido"
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full input"
            {...register("password", {
              required: "La contraseña es obligatoria"
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button type="submit" className="btn w-full">
          Iniciar Sesión
        </button>
      </form>
    </>
  );
}
