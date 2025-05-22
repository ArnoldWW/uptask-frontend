import Logo from "@/components/Logo";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  // detect current path
  const currentPath = useLocation().pathname;

  return (
    <div className="bg-gray-800 py-10 min-h-screen flex flex-col items-center">
      <div className="max-w-[500px] w-[90%] mx-auto flex flex-col items-center">
        <Logo />

        <div className="mt-10 w-full">
          <Outlet />
        </div>

        <nav className="mt-10 w-full flex gap-5 flex-col">
          {currentPath === "/auth/login" && (
            <Link to="/auth/register" className="link">
              ¿No tienes una cuenta?. Ir a crear cuenta.
            </Link>
          )}

          {currentPath === "/auth/register" && (
            <Link to="/auth/login" className="link">
              ¿Ya tienes una cuenta?. Ir a iniciar sesión.
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
