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

type EditTaskModalProps = {
  data: Task;
  taskId: string;
};

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {
  const navigate = useNavigate();

  /* leer si el modal es visible */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalEditTask = queryParams.get("editTask");
  const show = modalEditTask ? true : false;

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
      reset();
      navigate(location.pathname, { replace: true });
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
    <Dialog
      open={show}
      onClose={() => navigate(location.pathname, { replace: true })}
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4"
    >
      <DialogPanel className="max-w-lg flex flex-col gap-3 bg-white p-10 rounded min-w-[300px] w-[90%]">
        <DialogTitle className="font-bold text-xl ">Editar tarea</DialogTitle>
        <Description>Modifica la información de la tarea</Description>

        <form
          className="mt-1"
          onSubmit={handleSubmit(handleEditTask)}
          noValidate
        >
          <TaskForm register={register} errors={errors} />
          <button type="submit" className="btn">
            Editar
          </button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}
