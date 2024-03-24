import style from "./Menu.module.css";
import { menuData } from "./data/menu-data";

export const Menu = () => {
  return (
    <nav className={style.menu}>
      <div className={style["menu-wrapper"]}>
        <div className="logo-wrapper"></div>
        <div className="menu-nav-wrapper">
          <ul>
            {menuData.map(navEl=><li key={navEl.link}>
              <div className="menu-icon-wrapper">{navEl.icon}</div>
              <a href={navEl.link}>{navEl.linkName}</a>
            </li>)}
          </ul>
        </div>
      </div>
    </nav>
  );
};