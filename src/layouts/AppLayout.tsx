import { Outlet, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { NavMenu } from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import Loading from "@/components/Loading";

export default function AppLayout() {
  // Get the authenticated user data
  const { data: user, isLoading, isError } = useAuth();
  const navigate = useNavigate();

  // Redirect to login page if there is an error
  useEffect(() => {
    if (isError) {
      navigate("/auth/login");
    }
  }, [isError, navigate]);

  // If the user is not authenticated and the page isn't loading, redirect to the login page
  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/auth/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return null;
  }

  return (
    <div>
      <header className="bg-gray-800 py-5">
        <div className="customContainer flex flex-col lg:flex-row justify-between items-center">
          <Logo URL="/" />

          <div>
            <NavMenu />
          </div>
        </div>
      </header>

      <section className="customContainer my-10 py-5">
        <Outlet />
      </section>

      <footer className="bg-gray-800 text-white py-5">
        <div className="customContainer">
          <p className="text-sm font-bold">
            Uptask &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
