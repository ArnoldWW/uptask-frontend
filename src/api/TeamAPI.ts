import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberFormData } from "../types";
import api from "@/lib/axios";
import { TeamMemeberSchema } from "../types/index";

// Search user by email
export async function findUserByEmail({
  projectId,
  formData
}: {
  projectId: Project["_id"];
  formData: TeamMemberFormData;
}) {
  try {
    const url = `/projects/${projectId}/team/find`;

    const { data } = await api.post(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// Add member to team
export async function addMemberToProjectTeam({
  projectId,
  id
}: {
  projectId: string;
  id: TeamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.post(url, { id });

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    }
  }
}

// Get all team members of a project
export async function getProjectTeam({
  projectId
}: {
  projectId: Project["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.get(url);

    const response = TeamMemeberSchema.safeParse(data);

    if (!response.success) {
      throw new Error("Error en la validación de datos");
    }

    // If the response is valid, return the data
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    }
  }
}

// Remove member from team
export async function removeMemberFromTeam({
  projectId,
  userId
}: {
  projectId: Project["_id"];
  userId: TeamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team/${userId}`;
    const { data } = await api.delete(url);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);

      throw new Error(error.response.data.error);
    }
  }
}
