// import style from "./Menu.module.css";
import { menuData } from "./data/menu-data";

export const Menu = () => {
  return (
    <nav className="sticky bg-gray-950 w-full">
      <div className="flex flex-row items-center justify-between px-9 py-4">
        <div className="logo-wrapper">
          <span className="text-sm font-semibold text-gray-50 uppercase">Phone book</span>
        </div>
        <div className="">
          <ul className="flex flex-row gap-8">
            {menuData.map(navEl=><li className="flex gap-2 items-center pr-8 border-gray-500 border-r last:border-r-0 hover:text-white transition-all" key={navEl.link}>
              <div className="">{navEl.icon}</div>
              <a className="" href={navEl.link}>{navEl.linkName}</a>
            </li>)}
          </ul>
        </div>
      </div>
    </nav>
  );
};