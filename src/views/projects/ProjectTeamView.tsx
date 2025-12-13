import { Fragment } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { getProjectTeam, removeMemberFromTeam } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  // Query to get all team members of a project
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectTeam", projectId],
    queryFn: () => getProjectTeam({ projectId })
  });

  // Mutation to remove a member from the project team
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: removeMemberFromTeam,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      // Force refetch of the project team
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
      toast.success(data);
    }
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data)
    return (
      <>
        <h1 className="text-3xl font-black mb-5">Administrar equipo</h1>
        <p className="mb-5">Gestiona los miembros del equipo del proyecto</p>

        <nav className="my-5 flex gap-3">
          <Link to={`/projects/${projectId}`} className="btn">
            &larr;
          </Link>

          <button
            type="button"
            className="btn"
            onClick={() => navigate(location.pathname + "?addMember=true")}
          >
            Agregar colaborador
          </button>
        </nav>

        {data?.length ? (
          <ul
            role="list"
            className="divide-y rounded divide border border-gray-200 mt-10 bg-white"
          >
            {data.map((member) => (
              <li key={member._id} className="flex justify-between gap-x-6 p-7">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-xl font-bold">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.email}</p>
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
                      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded bg-white py-2 focus:outline-none border border-gray-200">
                        <MenuItem>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500 hover:underline"
                            onClick={() =>
                              mutate({ projectId, userId: member._id })
                            }
                          >
                            Eliminar del equipo
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-10">
            <p className="text-center my-5">No hay miembros en el equipo</p>
          </div>
        )}

        {/* modal para agregar miembro */}
        <AddMemberModal />
      </>
    );
}
