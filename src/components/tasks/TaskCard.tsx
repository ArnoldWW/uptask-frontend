import { Fragment } from "react";
import { Task } from "@/types/index";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/api/TaskAPI";

type TaskCardProps = {
  task: Task;
  canEdit: boolean;
};

export default function TaskCard({ task, canEdit }: TaskCardProps) {
  const navigate = useNavigate();

  /* obtener el proyecto id de la url */
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId]
      });
      toast.success(data!);
    }
  });

  return (
    <li className="p-5 bg-white border rounded flex justify-between gap-3">
      <div>
        <button
          type="button"
          className="font-bold text-left"
          onClick={() => navigate(location.pathname + "?viewTask=" + task._id)}
        >
          {task.name}
        </button>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>

      <Menu as="div" className="relative flex-none">
        <MenuButton className="-m-2.5 block p-2 text-gray-900 rounded-full hover:bg-neutral-100">
          <span className="sr-only">opciones</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute left-50 z-50 mt-2 w-56 origin-top-right rounded bg-white py-2 shadow-sm focus:outline-none border">
            <MenuItem>
              <button
                type="button"
                onClick={() =>
                  navigate(location.pathname + "?viewTask=" + task._id)
                }
                className="block px-3 py-1 text-sm leading-6 hover:underline"
              >
                Ver Tarea
              </button>
            </MenuItem>
            {canEdit && (
              <>
                <MenuItem>
                  <button
                    className="block px-3 py-1 text-sm leading-6 hover:underline"
                    onClick={() =>
                      navigate(location.pathname + "?editTask=" + task._id)
                    }
                  >
                    Editar Tarea
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    type="button"
                    className="block px-3 py-1 text-sm leading-6 text-red-500 hover:underline"
                    onClick={() => mutate({ projectId, taskId: task._id })}
                  >
                    Eliminar Tarea
                  </button>
                </MenuItem>
              </>
            )}
          </MenuItems>
        </Transition>
      </Menu>
    </li>
  );
}
