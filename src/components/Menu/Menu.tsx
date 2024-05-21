// import style from "./Menu.module.css";
import { Link } from "react-router-dom";
import { menuData } from "./data/menu-data";
import { ROUTES } from "../../routes";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { LoginProvider } from "../../context/UserContext";

export const Menu = () => {
  return (
    <nav className="sticky bg-gray-950 w-full">
      <div className="flex flex-row items-center justify-between px-9 py-4">
        <div className="logo-wrapper">
          <Link to={ROUTES.home} className="text-sm font-semibold text-gray-50 uppercase">
            Phone book
          </Link>
        </div>
        <div className="">
          <ul className="flex flex-row gap-8">
            <LoginProvider>
              <ThemeToggle />
            </LoginProvider>
            {menuData.map((navEl) => (
              <li
                className="flex gap-2 items-center pr-8 border-gray-500 border-r last:border-r-0 hover:text-white transition-all"
                key={navEl.link}
              >
                <div className="">{navEl.icon}</div>
                <Link className="" to={navEl.link}>
                  {navEl.linkName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
