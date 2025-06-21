import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {
  CheckPasswordForm,
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  User,
  UserLoginForm,
  UserRegistrationForm,
  userSchema,
} from "../types";

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

// function to request a new token
export async function requestNewConfirmationToken(
  formData: RequestConfirmationCodeForm,
) {
  try {
    const url = "/auth/request-new-token";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

// function to authenticate user
export async function authenticateUser(formData: UserLoginForm) {
  try {
    const url = "/auth/login";
    const { data } = await api.post(url, formData);

    // Store the token in local storage
    localStorage.setItem("UPTASK_TOKEN", data);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

// function to request a new password
export async function requestNewPassword(formData: ForgotPasswordForm) {
  try {
    const url = "/auth/forgot-password";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

// function to validate token
export async function validateToken(formData: ConfirmToken) {
  try {
    const url = "/auth/validate-token";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

// function to update password
export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  try {
    const url = `/auth/update-password/${token}`;

    console.log(token);

    const { data } = await api.post(url, formData);

    console.log("data", data);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

// function to get authenticated user
export async function getAuthenticatedUser() {
  try {
    const url = "/auth/user";
    const { data } = await api.get<User>(url);

    // Validate with zod
    const response = userSchema.safeParse(data);

    console.log("response", response);

    if (!response.success) {
      throw new Error("Invalid user data");
    }

    // If the response is valid, return the user data
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

// Function to validate password when I want to delete a project
export async function checkPassword(formData: CheckPasswordForm) {
  try {
    const url = "/auth/check-password";
    const { data } = await api.post(url, formData);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
