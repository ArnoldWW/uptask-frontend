import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import toast from "react-hot-toast";

export default function LoginView() {
  const navigate = useNavigate();

  const initialValues: UserLoginForm = {
    email: "",
    password: ""
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  // mutation for login
  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    }
  });

  const handleLogIn = (formData: UserLoginForm) => {
    console.log("Login data:", formData);

    // call login mutation
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-3xl font-black mb-5 text-center text-white">
        Iniciar Sesión
      </h1>

      <form
        onSubmit={handleSubmit(handleLogIn)}
        noValidate
        className="bg-white w-full p-5 rounded flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico (e.j. user@example.com)"
            className="w-full input"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electrónico no válido"
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
