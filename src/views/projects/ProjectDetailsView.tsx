import { getFullProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import EditTaskData from "../../components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";

export default function ProjectDetailsView() {
  const navigate = useNavigate();

  // Get data from user
  const { data: user, isLoading: authLoading } = useAuth();

  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getFullProjectById(projectId),
    refetchOnWindowFocus: false,
    retry: false
  });

  // Check if the user can edit the project
  const canEdit = user?._id === data?.manager;

  if (isLoading && authLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data && user)
    return (
      <>
        <h1 className="text-3xl font-black mb-5">{data.projectName}</h1>
        <p className="mb-5">{data.description}</p>

        {user?._id === data.manager && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="btn"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar Tarea
            </button>

            <Link to={location.pathname + "/team"} className="btn">
              Gestionar Equipo
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        {canEdit && <EditTaskData />}
        <TaskModalDetails />
      </>
    );
}
