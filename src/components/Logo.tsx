import { Link } from "react-router-dom";

type LogoProps = {
  URL?: string;
};

export default function Logo({ URL = "/" }: LogoProps) {
  return (
    <Link to={URL} className="block w-32">
      <img src="/logo.svg" alt="logo uptask" />
    </Link>
  );
}
