import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ProjectForm from "@/components/projects/ProjectForm";
import { updateProject } from "@/api/ProjectAPI";

import { Project, ProjectFormData } from "@/types/index";

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

export default function EditProjectForm({
  data,
  projectId
}: EditProjectFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      clientName: data.clientName,
      projectName: data.projectName,
      description: data.description
    }
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      //deshabiltar el cache para tener los datos siempre actualziados
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
      toast.success(data);
      navigate("/");
    }
  });

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId
    };
    mutate(data);
  };

  return (
    <>
      <h1 className="text-3xl font-black mb-5">Editar Proyecto</h1>
      <Link to="/" className="btn">
        Volver
      </Link>

      <div className="max-w-full md:max-w-[800px] md:mx-auto">
        <form
          className="mt-10 bg-white border border-gray-200 p-7 rounded"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <button type="submit" className="btn w-full">
            Guardar Cambios
          </button>
        </form>
      </div>
    </>
  );
}
