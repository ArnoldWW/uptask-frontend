import { getProjects } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/hooks/useAuth";
import Loading from "../components/Loading";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";

export default function DashboardView() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from user
  const { data: user, isLoading: authLoading } = useAuth();

  // Query get all projects
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading && authLoading) return <Loading />;

  return (
    <>
      <h1 className="text-3xl font-black mb-5">Mis proyectos</h1>
      <p className="mb-5">Maneja y administra tus proyectos</p>
      <Link to="/projects/create" className="btn">
        Crear Proyecto
      </Link>
      {data?.length ? (
        <ul
          role="list"
          className="divide-y rounded divide border mt-10 bg-white"
        >
          {data.map((project) => (
            <li key={project._id} className="flex justify-between gap-x-6 p-7">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-40 max-w-80 flex flex-col gap-2">
                  {user?._id !== project.manager ? (
                    <span className="text-purple-500 block text-sm">
                      Invitado
                    </span>
                  ) : (
                    <span className="text-green-500 block text-sm">
                      Manager
                    </span>
                  )}

                  <Link
                    to={`/projects/${project._id}`}
                    className="cursor-pointer hover:underline text-2xl font-bold"
                  >
                    {project.projectName}
                  </Link>
                  <p className="text-sm">Cliente: {project.clientName}</p>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon
                      className="h-9 w-9"
                      aria-hidden="true"
                    />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded bg-white py-2 shadow-sm focus:outline-none border">
                      <MenuItem>
                        <Link
                          to={`/projects/${project._id}`}
                          className="block px-3 py-1 text-sm leading-6 hover:underline"
                        >
                          Ver Proyecto
                        </Link>
                      </MenuItem>

                      {user?._id === project.manager && (
                        <>
                          <MenuItem>
                            <Link
                              to={`/projects/${project._id}/edit`}
                              className="block px-3 py-1 text-sm leading-6 hover:underline"
                            >
                              Editar Proyecto
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <button
                              type="button"
                              className="block px-3 py-1 text-sm leading-6 text-red-500 hover:underline"
                              onClick={() =>
                                navigate(
                                  location.pathname +
                                    `?deleteProject=${project._id}`,
                                )
                              }
                            >
                              Eliminar Proyecto
                            </button>
                          </MenuItem>
                        </>
                      )}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="py-10">
          <p className="text-center my-5">No hay proyectos aún</p>
        </div>
      )}

      <DeleteProjectModal />
    </>
  );
}
