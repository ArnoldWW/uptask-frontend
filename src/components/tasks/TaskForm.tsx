import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>;
  register: UseFormRegister<TaskFormData>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
  return (
    <>
      <div className="flex flex-col gap-2 mb-5">
        <input
          id="name"
          type="text"
          placeholder="Nombre de la tarea"
          className="w-full input"
          {...register("name", {
            required: "El nombre de la tarea es obligatorio"
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <textarea
          id="description"
          placeholder="Descripción de la tarea"
          className="w-full input"
          {...register("description", {
            required: "La descripción de la tarea es obligatoria"
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
