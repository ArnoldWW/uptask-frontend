import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProfileLayout from "@/layouts/ProfileLayout";

import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import EditProjectView from "@/views/projects/EditProjectView";
import ProjectDetailsView from "@/views/projects/ProjectDetailsView";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import ConfirmationAccountView from "@/views/auth/ConfirmationAccountView";
import NewTokenView from "@/views/auth/NewTokenView";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView";
import NewPasswordView from "@/views/auth/NewPasswordView";
import ProjectTeamView from "@/views/projects/ProjectTeamView";
import ProfileView from "@/views/profile/ProfileView";
import ChangePasswordView from "@/views/profile/ChangePasswordView";
import NotFound from "./views/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamView />}
          />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} index />
            <Route
              path="/profile/changePassword"
              element={<ChangePasswordView />}
            />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route index path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmationAccountView />}
          />
          <Route path="/auth/request-new-token" element={<NewTokenView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
