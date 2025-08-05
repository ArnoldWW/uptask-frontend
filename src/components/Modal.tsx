import { useRef, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// OpenParam: string that represents the query parameter to open the modal
// title: string that represents the title of the modal
// children: ReactNode that represents the content of the modal
// onClose?: () => void that represents the function to close the modal
type ModalProps = {
  openParam: string;
  title: string;
  children: ReactNode;
};

export default function Modal({ openParam, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const show = queryParams.get(openParam) ? true : false;

  // 1st useEffect to open the modal if "openParam" is in the URL
  useEffect(() => {
    if (show && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (!show && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [show]);

  // 2nd useEffect to close the modal if "openParam" is removed from the URL and when clicked outside
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      navigate(location.pathname, { replace: true });
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === dialog) {
        dialog.close();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("click", handleClickOutside);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("click", handleClickOutside);
    };
  }, [navigate, location.pathname]);

  // Function to close the modal
  const closeDialog = () => {
    dialogRef.current?.close();
    navigate(location.pathname, { replace: true });
  };

  return (
    <dialog ref={dialogRef} className="rounded z-10">
      <div className="flex flex-col gap-3 bg-white p-10 rounded md:min-w-[400px] max-w-[800px]">
        <div className="flex justify-between items-center gap-5">
          <h2 className="font-bold text-xl">{title}</h2>
          <button
            type="button"
            className="hover:bg-neutral-100 px-2 rounded"
            onClick={closeDialog}
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </dialog>
  );
}
