import Wrapper from "../assets/wrappers/BigSidebar";
import links from "../utils/links";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link;

              return (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  //Navlink has this functionality that it give as isActive property in built and whatever we will return from the callback function inside of className will be applied as a class to Navlink component
                  key={id}
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
