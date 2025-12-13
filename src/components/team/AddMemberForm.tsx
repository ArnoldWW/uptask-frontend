import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { TeamMemberFormData } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
  const initialValues: TeamMemberFormData = {
    email: ""
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findUserByEmail
  });

  const handleSearchUser = async (formData: TeamMemberFormData) => {
    mutation.mutate({ projectId, formData });
  };

  const resetData = () => {
    reset();
    mutation.reset();
  };

  return (
    <>
      <form
        className="bg-white"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-2 mb-5">
          <input
            id="name"
            type="text"
            placeholder="Correo electronico del usuario ej: user@example.com"
            className="w-full input"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido"
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input type="submit" className="btn" value="Buscar Usuario" />
      </form>

      {mutation.isPending && (
        <p className="text-center my-2">Buscando usuario...</p>
      )}

      {mutation.isError && (
        <>
          <hr className="my-2" />
          <p className="text-center">Usuario no encontrado</p>
        </>
      )}

      {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
    </>
  );
}
