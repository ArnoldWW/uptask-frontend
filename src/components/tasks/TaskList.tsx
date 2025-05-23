import { Task } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";

type TaskListProps = {
  tasks: Task[];
};

type GropedTasks = {
  [key: string]: Task[];
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

export default function TaskList({ tasks }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  return (
    <div>
      <h2 className="text-2xl font-black my-3">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll md:overflow-auto pb-32">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <ul className="mt-5 space-y-5">
              <h3
                className={`capitalize rounded border p-3 border-t-4 font-bold ${statusStyles[status]}`}
              >
                {statusTranslations[status]}
              </h3>

              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  No Hay tareas
                </li>
              ) : (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
