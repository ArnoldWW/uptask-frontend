import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData, taskSchema } from "@/types/index";

type TaskAPIType = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId?: Task["_id"];
  status?: string;
};

// Create task
export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPIType, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}

/* get tasks by id */
export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPIType, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.get(url);
    console.log(data);
    const response = taskSchema.safeParse(data);

    if (!response.success) {
      console.log("Error en la validación de datos:", response.error);
      throw new Error("Error en la validación de datos");
    }

    // if response is success, return data
    if (response.success) {
      return response?.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}

/* update task */
export async function updateTask({
  projectId,
  taskId,
  formData,
}: Pick<TaskAPIType, "projectId" | "taskId" | "formData">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put<string>(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}

/* delete task */
export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskAPIType, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete<string>(url);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}

/* update task status */
export async function updateTaskStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPIType, "projectId" | "taskId" | "status">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`;
    const { data } = await api.post<string>(url, { status });

    console.log(data);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}
