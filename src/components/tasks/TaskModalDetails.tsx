import { useNavigate, useParams } from "react-router-dom";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateTaskStatus } from "@/api/TaskAPI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { formatDate } from "@/utils/index";
import { statusTranslations } from "@/locales/es";
import { taskStatus } from "@/types/index";

export default function TaskModalDetails() {
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  // Get the taskId from the URL
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")?.toString();

  // If the taskId is not present, show the modal
  const show = taskId ? true : false;

  // Get task data from the API
  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
    refetchOnWindowFocus: false,
  });

  //useMutation for updating task status
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTaskStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data!);

      // Invalidate the query to refetch the task data
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });

      // Invalidate the query to refetch the task data
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });

      // Close the modal
      navigate(location.pathname, { replace: true });
    },
  });

  // HandleChangeStatus function to update the task status
  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as taskStatus;
    const data = { projectId, taskId, status };
    mutate(data);
  };

  // If there is an error, show a message and redirect to the tasks page
  useEffect(() => {
    if (isError) {
      toast.error("Error al cargar la tarea");
      console.log(isError);
      navigate(location.pathname, { replace: true });
    }
  }, [isError, navigate, location.pathname]);

  if (!data) return null;

  return (
    <Dialog
      open={show}
      onClose={() => navigate(location.pathname, { replace: true })}
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4"
    >
      <DialogPanel className="max-w-lg flex flex-col gap-3 bg-white p-10 rounded min-w-[300px] w-[90%]">
        <span className="text-xs block text-gray-500">
          Actualizado el {formatDate(data.updatedAt)}
        </span>
        <span className="text-xs block text-gray-500">
          Creado el {formatDate(data.createdAt)}
        </span>

        {data.completedBy.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {data.completedBy.map(({ user, status, _id }, index) => (
              <li key={_id} className="text-xs block text-gray-500">
                {index + 1}. Completado por{" "}
                <strong>
                  {user.name} ({statusTranslations[status]})
                </strong>
              </li>
            ))}
          </ul>
        ) : null}
        <DialogTitle className="font-bold text-xl ">
          Detalles de la tarea
        </DialogTitle>
        <Description>
          <strong>Titulo:</strong> {data.name}
        </Description>
        <Description>
          <strong>Descripción:</strong> {data.description}
        </Description>

        <div className="flex flex-col gap-2">
          {/* ESTADO DE LA TAREA */}
          <label htmlFor="status" className="font-bold">
            Estado de la tarea
          </label>
          <select
            id="status"
            className="w-full p-3 border-gray-300 border"
            defaultValue={data.status}
            onChange={handleChangeStatus}
          >
            {Object.entries(statusTranslations).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
