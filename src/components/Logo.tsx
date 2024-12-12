import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="w-32">
      <img src="/logo.svg" alt="logo uptask" />
    </Link>
  );
}
