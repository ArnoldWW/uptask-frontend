import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/CreateProjectView";
import EditProjectView from "@/views/EditProjectView";
import ProjectDetailsView from "@/views/ProjectDetailsView";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import ConfirmationAccountView from "@/views/auth/ConfirmationAccountView";
import NewTokenView from "@/views/auth/NewTokenView";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";

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
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} index />
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
      </Routes>
    </BrowserRouter>
  );
}
