import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    to: "/profile",
    label: "Mi perfil",
  },
  {
    to: "/profile/changePassword",
    label: "Cambiar contraseña",
  },
];

export default function ProfileLayout() {
  return (
    <>
      <div className="flex gap-2">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end>
            {({ isActive }) => (
              <span
                className={`p-2 border-b-2 select-none ${
                  isActive
                    ? "text-purple-500 border-purple-500"
                    : "border-b-transparent"
                }`}
              >
                {link.label}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      <div className="mt-10">
        <Outlet />
      </div>
    </>
  );
}
