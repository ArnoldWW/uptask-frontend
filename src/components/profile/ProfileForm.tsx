import { useForm } from "react-hook-form";
import { User, UserProfileForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/api/ProfileAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type ProfileFormProps = {
  user: User;
};

export default function ProfileForm({ user }: ProfileFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({ defaultValues: user });

  //QueryCliente
  const queryClient = useQueryClient();

  // Mutation for update user Profile
  const { mutate } = useMutation({
    mutationFn: updateUserProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data) toast.success("Perfil actualizado exitosamente");
      toast.success(data);

      queryClient.invalidateQueries({
        queryKey: ["user"]
      });

      navigate("/");
    }
  });

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData);

  // Watch form values
  const watchedName = watch("name");
  const watchedEmail = watch("email");

  // Check if values are unchanged
  const isUnchanged = watchedName === user.name && watchedEmail === user.email;

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-black">Mi Perfil</h1>
      <p className="mt-2">Aquí puedes actualizar tu información</p>

      <form
        onSubmit={handleSubmit(handleEditProfile)}
        className="flex flex-col gap-2 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="input"
            {...register("name", {
              required: "Nombre de usuario es obligatoro"
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <input
            id="text"
            type="email"
            placeholder="Tu correo electrónico"
            className="input"
            {...register("email", {
              required: "EL correo electrónico es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Correo electrónico no válido"
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Guardar Cambios"
          className="btn w-full mt-5 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={isUnchanged}
        />
      </form>
    </div>
  );
}
