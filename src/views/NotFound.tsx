import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-3 mx-auto bg-gray-800 py-10 min-h-screen items-center justify-center text-white">
      <Logo URL="/" />
      <h1>404 - Pagina no encontrada</h1>
      <Link to="/" className="hover:underline text-xs">
        &larr; Volver
      </Link>
    </div>
  );
}
