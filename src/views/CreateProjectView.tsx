import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {
  const navigate = useNavigate();
  const initialValues: ProjectFormData = {
    clientName: "",
    projectName: "",
    description: ""
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  //React query
  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    }
  });

  const handleForm = (formData: ProjectFormData) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <h1 className="text-3xl font-black mb-5">Crear Proyecto</h1>
      <p className="mb-5">Completa el formulario para crear un proyecto</p>
      <Link to="/" className="btn">
        Volver
      </Link>

      <div className="max-w-full md:max-w-[800px] md:mx-auto">
        <form
          className="mt-10 bg-white border p-7 rounded-md"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <button type="submit" className="btn w-full">
            Crear Proyecto
          </button>
        </form>
      </div>
    </>
  );
}
