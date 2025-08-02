import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import { Task, TaskFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTask } from "@/api/TaskAPI";
import Modal from "../Modal";

type EditTaskModalProps = {
  data: Task;
  taskId: string;
};

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {
  const navigate = useNavigate();

  /* obtener el proyecto id de la url */
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskFormData>({
    defaultValues: {
      name: data?.name,
      description: data?.description
    }
  });

  console.log(data);

  /* tank stack query para actualizar la tarea */
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId]
      });
      toast.success(data!);
      navigate(location.pathname, { replace: true });
      reset();
    }
  });

  const handleEditTask = (formData: TaskFormData) => {
    const data = {
      projectId,
      taskId,
      formData
    };

    mutate(data);
  };

  return (
    <Modal openParam="editTask" title="Editar tarea">
      <form className="mt-1" onSubmit={handleSubmit(handleEditTask)} noValidate>
        <TaskForm register={register} errors={errors} />
        <button type="submit" className="btn">
          Editar
        </button>
      </form>
    </Modal>
  );
}
