import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  Project,
  ProjectFormData
} from "@/types/index";
import { isAxiosError } from "axios";

// Create project
export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}

// Get projects
export async function getProjects() {
  try {
    const { data } = await api.get("/projects");

    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}

// Get project by id
export async function getProjectById(id: Project["_id"]) {
  try {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}

// Update project
type UpdateProjectType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

export async function updateProject({
  formData,
  projectId
}: UpdateProjectType) {
  try {
    const { data } = await api.put(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}

// Delete project
export async function deleteProject(id: Project["_id"]) {
  try {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data.error);

      throw new Error(error.response.data.error);
    }
  }
}
