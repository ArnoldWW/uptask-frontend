import { useForm } from "react-hook-form";
import { ForgotPasswordForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ""
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const handleForgotPassword = (formData: ForgotPasswordForm) => {};

  return (
    <>
      <h1 className="text-3xl font-black mb-5 text-center text-white">
        Solicitar Nueva Contraseña
      </h1>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="bg-white w-full p-5 rounded flex flex-col gap-5"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico de tu cuenta"
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

        <button type="submit" className="btn w-full">
          Solicitar Nueva Contraseña
        </button>
      </form>
    </>
  );
}
