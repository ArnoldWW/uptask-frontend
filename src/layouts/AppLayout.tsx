import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import { NavMenu } from "@/components/NavMenu";

export default function AppLayout() {
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
