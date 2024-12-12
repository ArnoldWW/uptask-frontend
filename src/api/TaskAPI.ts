import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData } from "@/types/index";

type TaskAPIType = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId?: Task["_id"];
};

export async function createTask({
  formData,
  projectId
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
  taskId
}: Pick<TaskAPIType, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.get(url);

    return data;
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
  formData
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
  taskId
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
