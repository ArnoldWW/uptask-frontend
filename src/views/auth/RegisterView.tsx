import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import toast from "react-hot-toast";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  // mutation to create account
  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      reset();
      toast.success(data);
    }
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-3xl font-black mb-5 text-center text-white">
        Crear Cuenta
      </h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white w-full p-5 rounded flex flex-col gap-5"
        noValidate
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
                message: "E-mail no válido"
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="name"
            placeholder="Nombre de usuario"
            className="w-full input"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio"
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full input"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres"
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Contraseña"
            className="w-full input"
            {...register("password_confirmation", {
              required: "La confirmación de contraseña es obligatoria",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden"
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <button type="submit" className="btn w-full">
          Crear Cuenta
        </button>
      </form>
    </>
  );
}
