import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckPasswordForm } from "@/types/index";
import Modal from "../Modal";
import ErrorMessage from "../ErrorMessage";
import { checkPassword } from "@/api/AuthAPI";
import { deleteProject } from "@/api/ProjectAPI";
import toast from "react-hot-toast";

export default function DeleteProjectModal() {
  // Get project id from url params
  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get("deleteProject")!;

  const navigate = useNavigate();

  const initialValues: CheckPasswordForm = {
    password: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: initialValues });

  // Mutation for check password
  const checkPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => {
      toast.error(error.message);
    }
  });

  // Query client for invalidating queries
  const queryClient = useQueryClient();

  // Mutation for delete project, if checkPassword is successful
  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      // Force refetch
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(data);
      reset();
    }
  });

  const handleForm = async (formData: CheckPasswordForm) => {
    // Mutation async wait for checkPassword response
    await checkPasswordMutation.mutateAsync(formData);

    // Mutation async for deleteProject response
    await deleteProjectMutation.mutateAsync(deleteProjectId);

    navigate(location.pathname, { replace: true });
  };

  return (
    <Modal openParam="deleteProject" title="Eliminar proyecto">
      <p>Ingresa tu contraseña para eliminar el proyecto</p>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <input
            id="password"
            type="password"
            placeholder="Tu contraseña"
            className="input w-full"
            {...register("password", {
              required: "La contraseña es obligatoria"
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input type="submit" className="btn w-full" value="Eliminar Proyecto" />
      </form>
    </Modal>
  );
}
