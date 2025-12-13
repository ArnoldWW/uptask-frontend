import { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router";
import { User } from "@/types/index";
import { useQueryClient } from "@tanstack/react-query";

type NavMenuProps = {
  user: User;
};

export const NavMenu = ({ user }: NavMenuProps) => {
  // Navigate to the home page
  const navigate = useNavigate();

  // Logout function
  const queryClient = useQueryClient();
  const handleLogout = () => {
    localStorage.removeItem("UPTASK_TOKEN");

    queryClient.removeQueries({ queryKey: ["user"] });

    navigate("/auth/login");
  };

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded bg-purple-500">
        <Bars3Icon className="w-8 h-8 text-white " />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded bg-white p-4 text-sm leading-6 border border-gray-200">
            <div className="flex flex-col gap-3">
              <p>
                {user.name} - {user.email}
              </p>
              <Link to="/profile" className="hover:underline">
                Mi Perfil
              </Link>
              <Link to="/" className="hover:underline">
                Mis Proyectos
              </Link>
              <button className="btn" type="button" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};
