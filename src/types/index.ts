import { z } from "zod";

/* AUTH & USERS FORMS */
const authSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type ConfirmToken = Pick<Auth, "token">;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

/* USERS */
export const userSchema = authSchema.pick({
  _id: true,
  name: true,
  email: true
});
export type User = z.infer<typeof userSchema>;

/* TASKS */
export const taskSchemaStatus = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed"
]);
export type taskStatus = z.infer<typeof taskSchemaStatus>;

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskSchemaStatus,
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

/* PROJECTS */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string()
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true
  })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;

/* TEAM */
const teamMemberSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string()
});
export const TeamMemeberSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberFormData = Pick<TeamMember, "email">;
