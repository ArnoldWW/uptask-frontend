import { Project, TaskProject, taskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "@/api/TaskAPI";
import toast from "react-hot-toast";
import { useParams } from "react-router";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

type GropedTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GropedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: []
};

const statusStyles: Record<string, string> = {
  pending: "border-t-gray-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-yellow-500",
  completed: "border-t-green-500"
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  // Get projectId from the URL
  const params = useParams();
  const projectId = params.projectId!;

  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

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
    }
  });

  // Function to handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    // Active is a reference to the draggable item
    // Over is a reference to the droppable area where the item was dropped
    const { active, over } = event;

    if (over && over.id) {
      // if the item was dropped over a valid droppable area
      const newStatus = over.id as string;
      const taskId = active.id as taskStatus;

      // Check if the new status is different from the current status
      const currentTask = tasks.find((task) => task._id === taskId);
      if (!currentTask || currentTask.status === newStatus) return;

      // Call the mutation to update the task status
      mutate({ projectId: projectId, taskId, status: newStatus });

      // Optimistic UI with queryClient
      queryClient.setQueryData(["project", projectId], (oldData: Project) => {
        if (!oldData) return oldData;

        const updatedTasks = oldData.tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        });

        return { ...oldData, tasks: updatedTasks };
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-black my-3">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll md:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <ul className="mt-5 flex flex-col gap-3">
                <h3
                  className={`capitalize rounded border border-gray-200 p-3 border-t-4 font-bold ${statusStyles[status]}`}
                >
                  {statusTranslations[status]}
                </h3>

                <DropTask status={status} />

                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </div>
  );
}
