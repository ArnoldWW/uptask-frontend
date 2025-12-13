import { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { useParams } from "react-router";
import toast from "react-hot-toast";

export default function AddNotesForm() {
  // Get the projectId from the URL
  const params = useParams();
  const projectId = params.projectId!;

  // Get the taskId from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const taskId = queryParams.get("viewTask")?.toString()!;

  // Initial values for the form
  const initialValues: NoteFormData = {
    content: ""
  };

  // Use the useForm hook to create a form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: initialValues });

  // Use the useQueryClient
  const queryClient = useQueryClient();

  // Use the useMutation hook to create a mutation
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);

      // Invalidate the query to refetch the task data
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      reset();
    }
  });

  // Handle the form submission for creating a note
  const handleAddNote = (data: NoteFormData) => {
    mutate({ formData: data, projectId, taskId });
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(handleAddNote)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Agregar nota
        </label>
        <textarea
          id="content"
          className="w-full input"
          placeholder="Escribe tu nota aquí"
          {...register("content", {
            required: "Este campo es obligatorio"
          })}
        />

        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>

      <button type="submit" className="btn">
        Crear nota
      </button>
    </form>
  );
}
