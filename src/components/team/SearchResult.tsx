import { useNavigate, useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMemberToProjectTeam } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import toast from "react-hot-toast";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

export default function SearchResult({ user, reset }: SearchResultProps) {
  const navigate = useNavigate();

  // Get the project id from the url
  const params = useParams();
  const projectId = params.projectId!;

  // mutation to add member to team
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addMemberToProjectTeam,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
    }
  });

  return (
    <>
      <hr className="my-2" />
      <div className="w-full flex justify-between items-center gap-2">
        <p>
          {user.name} - {user.email}
        </p>

        <button
          className="btn"
          onClick={() => mutate({ projectId, id: user._id })}
        >
          Agregar
        </button>
      </div>
    </>
  );
}
