import { useContext } from "react";
import { myContext } from "../context/myContext";
function NavLink({ Icon, text, linkto }) {
  const context = useContext(myContext);
  const { setToggle } = context;

  return (
    <div className="sidebar-nav">
      <div className="nav-container" onClick={() => setToggle()}>
        <Icon className="nav-icon" />
        <a href={linkto}>{text}</a>
      </div>
    </div>
  );
}

export default NavLink;
