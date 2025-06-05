import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddMemberForm from "./AddMemberForm";

export default function AddMemberModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const show = queryParams.get("addMember") === "true";

  useEffect(() => {
    // Open the dialog when the show prop is true
    if (show && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }

    // Close the dialog when the show prop is false
    if (!show && dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
  }, [show]);

  // Event lister when the dialog is closed with "esc" key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Reset the query param when the dialog is closed
    const handleClose = () => {
      navigate(location.pathname, { replace: true });
    };

    // Close the dialog when the user clicks outside of it
    const handleClickOutside = (e: MouseEvent) => {
      if (dialog && e.target === dialog) {
        dialog.close(); // Esto también dispara el evento close
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog?.addEventListener("click", handleClickOutside);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog?.removeEventListener("click", handleClickOutside);
    };
  }, [navigate, location.pathname]);

  const closeDialog = () => {
    dialogRef.current?.close();
    navigate(location.pathname, { replace: true });
  };

  return (
    <dialog ref={dialogRef} className="rounded z-10">
      <div className="flex flex-col gap-3 bg-white p-10 rounded">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">Agregar miembro al equipo</h2>
          <button
            type="button"
            className="hover:bg-neutral-100 px-2 rounded"
            onClick={closeDialog}
          >
            &times;
          </button>
        </div>

        <p>
          Busca el usuario por su correo electronico y agrega al equipo del
          proyecto
        </p>

        <AddMemberForm />
      </div>
    </dialog>
  );
}
