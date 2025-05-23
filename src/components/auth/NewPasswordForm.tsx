import type { ConfirmToken, NewPasswordForm } from "@/types/index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type NewPasswordFormProps = {
  token: ConfirmToken["token"];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: ""
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  // Mutation for updating password
  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    }
  });

  // Function to handle form submission
  const handleNewPassword = (formData: NewPasswordForm) => {
    console.log(formData, token);

    // Call the mutation to update password
    mutate({ formData, token });
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(handleNewPassword)}
      noValidate
      className="bg-white w-full p-5 rounded flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full input"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "El Password debe ser mínimo de 8 caracteres"
            }
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      {/* repetir contraseña */}
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
        Guardar Nueva Contraseña
      </button>
    </form>
  );
}
