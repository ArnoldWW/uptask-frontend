import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  /* project id */
  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  const { data, isError, isFetching } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false,
    staleTime: 0,
    refetchOnMount: true
  });

  console.log(data);

  if (isError) return <Navigate to="/404" />;

  if (isFetching) return "Cargando...";

  if (data)
    return <EditTaskModal key={data.updatedAt} data={data} taskId={taskId} />;
}
