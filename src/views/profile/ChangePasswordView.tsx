import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { updateUserPassword } from "@/api/ProfileAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangePasswordForm } from "@/types/index";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function ChangePasswordView() {
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();

  const initialValues: ChangePasswordForm = {
    current_password: "",
    password: "",
    password_confirmation: ""
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  // Mutate function for updating user password
  const { mutate } = useMutation({
    mutationFn: updateUserPassword,
    onError: (error) => {
      console.error("Error updating password:", error.message);
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      handleLogout();
    }
  });

  // Mutation function for update password
  const handleChangePassword = (formData: ChangePasswordForm) => {
    console.log(formData);
    mutate(formData);
  };

  // Function for logging out after update password
  const queryClient = useQueryClient();
  const handleLogout = () => {
    localStorage.removeItem("UPTASK_TOKEN");

    queryClient.removeQueries({ queryKey: ["user"] });

    navigate("/auth/login");
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-black">Cambiar Contraseña</h1>
      <p className="mt-2">
        Utiliza este formulario para cambiar tu password,{" "}
        <strong>
          si cambias la contraseña deberás volver a inciar sesión*
        </strong>
      </p>

      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="flex flex-col gap-5 mt-10"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <input
            id="current_password"
            type={showPasswords ? "text" : "password"}
            placeholder="Contraseña actual"
            className="w-full input"
            {...register("current_password", {
              required: "La contraseña actual es obligatoria"
            })}
          />
          {errors.current_password && (
            <ErrorMessage>{errors.current_password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            id="password"
            type={showPasswords ? "text" : "password"}
            placeholder="Nueva contraseña"
            className="w-full input"
            {...register("password", {
              required: "El Nuevo Password es obligatorio",
              minLength: {
                value: 8,
                message: "La contraseña debe ser mínimo de 8 caracteres"
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
            type={showPasswords ? "text" : "password"}
            placeholder="Repetir nueva contraseña"
            className="w-full input"
            {...register("password_confirmation", {
              required: "Este campo es obligatorio",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden"
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={() => setShowPasswords(!showPasswords)}
          />
          <span>Mostrar contraseñas</span>
        </label>

        <input type="submit" value="Cambiar Contraseña" className="btn" />
      </form>
    </div>
  );
}
