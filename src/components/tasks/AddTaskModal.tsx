import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTask } from "@/api/TaskAPI";
import Modal from "../Modal";

export default function AddTaskModal() {
  const navigate = useNavigate();

  // Get the project ID from the URL
  const params = useParams();
  const projectId = params.projectId!;

  const initialValues: TaskFormData = {
    name: "",
    description: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskFormData>({
    defaultValues: initialValues
  });

  // Mutation to create a new task
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      console.log(data);
      toast.success(data!);
      reset();
      navigate(location.pathname, { replace: true });
    }
  });

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId
    };
    mutate(data);
  };

  return (
    <Modal openParam="newTask" title="Nueva Tarea">
      <p>Llena el formulario para crear una nueva tarea</p>
      <form onSubmit={handleSubmit(handleCreateTask)} noValidate>
        <TaskForm register={register} errors={errors} />
        <button type="submit" className="btn">
          Crear
        </button>
      </form>
    </Modal>
  );
}
