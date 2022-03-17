import Wrapper from "../assets/wrappers/SmallSidebar";
import links from "../utils/links";
import Logo from "./Logo";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" type="button" onClick={toggleSidebar}>
            <FaTimes />
          </button>
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
                  onClick={toggleSidebar}
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

export default SmallSidebar;
