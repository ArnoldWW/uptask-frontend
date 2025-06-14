import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ChangePasswordForm, UserProfileForm } from "@/types/index";

// Function to update user profile (name and email)
export async function updateUserProfile(formData: UserProfileForm) {
  try {
    const { data } = await api.put("/auth/profile", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

// Function to update user password
export async function updateUserPassword(formData: ChangePasswordForm) {
  try {
    console.log("updatePasswordOfAuthenticatedUser");
    const { data } = await api.post("/auth/update-password", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
