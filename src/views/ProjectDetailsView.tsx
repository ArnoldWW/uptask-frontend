import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EditTaskData from "../components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";

export default function ProjectDetailsView() {
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId)
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data)
    return (
      <>
        <h1 className="text-3xl font-black mb-5">{data.projectName}</h1>
        <p className="mb-5">{data.description}</p>

        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="btn"
            onClick={() => navigate(location.pathname + "?newTask=true")}
          >
            Agregar Tarea
          </button>
        </nav>

        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
