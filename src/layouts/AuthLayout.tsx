import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import Loading from "@/components/Loading";

type LinkType = {
  to: string;
  label: string;
};

// Type for the links object
// Example: "/auth/login": LinkType[]
type LinksType = {
  [key: string]: LinkType[];
};

const links: LinksType = {
  "/auth/login": [
    {
      to: "/auth/register",
      label: "¿No tienes una cuenta?. Ir a crear cuenta."
    },
    {
      to: "/auth/forgot-password",
      label: "¿Olvidaste tu contraseña?. Recuperar contraseña."
    }
  ],
  "/auth/register": [
    {
      to: "/auth/login",
      label: "¿Ya tienes una cuenta?. Ir a iniciar sesión."
    },
    {
      to: "/auth/forgot-password",
      label: "¿Olvidaste tu contraseña?. Recuperar contraseña."
    }
  ],
  "/auth/confirm-account": [
    {
      to: "/auth/request-new-token",
      label: "¿No recibiste el código?. Solicitar nuevo código."
    },
    { to: "/auth/login", label: "¿Ya tienes una cuenta?. Ir a iniciar sesión." }
  ],
  "/auth/request-new-token": [
    { to: "/auth/login", label: "¿Ya tienes una cuenta?. Ir a iniciar sesión." }
  ],
  "/auth/forgot-password": [
    {
      to: "/auth/login",
      label: "¿Ya tienes una cuenta?. Ir a iniciar sesión."
    },
    {
      to: "/auth/register",
      label: "¿No tienes una cuenta?. Ir a crear cuenta."
    }
  ]
};

export default function AuthLayout() {
  // detect current path
  const currentPath = useLocation().pathname;

  const { data: user, isLoading } = useAuth();
  const navigate = useNavigate();

  // If the user is authenticated, redirect to index page
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-800 py-10 min-h-screen flex flex-col items-center">
      <div className="max-w-[500px] w-[90%] mx-auto flex flex-col items-center">
        <Logo URL="/auth/login" />

        <div className="mt-10 w-full">
          <Outlet />
        </div>

        <nav className="mt-10 w-full flex gap-5 flex-col">
          {links[currentPath]?.map((link: LinkType) => (
            <Link key={link.to} to={link.to} className="link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
