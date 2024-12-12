import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTask } from "@/api/TaskAPI";

export default function AddTaskModal() {
  const navigate = useNavigate();

  /* leer si el modal es visible */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get("newTask");
  const show = modalTask ? true : false;

  /* obtener el proyecto id de la url */
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
    <Dialog
      open={show}
      onClose={() => navigate(location.pathname, { replace: true })}
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4"
    >
      <DialogPanel className="max-w-lg space-y-4 bg-white p-10 rounded-md min-w-[300px] w-[90%]">
        <DialogTitle className="font-bold text-xl ">Nueva Tarea</DialogTitle>
        <Description>
          Llena el formulario para crear una nueva tarea
        </Description>

        <form
          className="mt-10"
          onSubmit={handleSubmit(handleCreateTask)}
          noValidate
        >
          <TaskForm register={register} errors={errors} />
          <button type="submit" className="btn">
            Crear
          </button>
        </form>
      </DialogPanel>
    </Dialog>
  );
}
