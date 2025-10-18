import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "@/types/index";
import { deleteNote } from "@/api/NoteAPI";
import AddNotesForm from "./AddNotesForm";
import { formatDate } from "@/utils/index";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

type AddNoteFormProps = {
  notes: Task["notes"];
};

export default function NotesPanel({ notes }: AddNoteFormProps) {
  // Get user data from useAuth
  const { data: user } = useAuth();

  // Get projectId from the URL
  const params = useParams();
  const projectId = params.projectId!;

  // Get the taskId from the URL
  const location = window.location;
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")?.toString()!;

  const queryClient = useQueryClient();

  // Mutation to delete a note
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data!);

      // Invalidate the query to refetch the task data
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    }
  });

  return (
    <>
      <h2 className="font-bold text-xl">Notas de la tarea</h2>

      <AddNotesForm />

      {notes?.length > 0 ? (
        <details>
          <summary className="cursor-pointer font-bold">
            Listado de notas
          </summary>
          <ul className="flex flex-col gap-3 pt-2 list-inside list-decimal">
            {notes.map((note) => (
              <li
                key={note._id}
                className=" text-gray-500 flex flex-col gap-2 border-b border-gray-200 pb-2"
              >
                {note.content}.
                <span className="text-xs block pl-auto text-gray-500">
                  {formatDate(note.createdAt)} - {note.createdBy.email}
                </span>
                {note.createdBy._id === user?._id ? (
                  <button
                    className="p-1 text-xs text-red-500 rounded hover:bg-red-100 self-start"
                    onClick={() =>
                      mutate({ projectId, taskId, noteId: note._id })
                    }
                  >
                    Eliminar nota
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </details>
      ) : (
        <p className="text-gray-500">No hay notas</p>
      )}
    </>
  );
}
