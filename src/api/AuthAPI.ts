import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { ConfirmToken, UserRegistrationForm } from "../types";

// function to create a new account
export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = "/auth/create-account";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

// function to confirm account
export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = "/auth/confirm-account";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
