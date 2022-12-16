import { useContext } from "react";
import {
  FaFacebook,
  FaTelegram,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaUser,
} from "react-icons/fa";
import {
  AiOutlineProject,
  AiFillFileText,
  AiTwotoneHome,
} from "react-icons/ai";
import { myContext } from "../context/myContext";
import { MdOutlineLocalPostOffice, MdComputer, MdHome } from "react-icons/md";
import classNames from "classnames";
import NavLink from "./NavLink";
import SocilaMideaLink from "./SocilaMideaLink";

function SideBar() {
  const context = useContext(myContext);
  const { toggle } = context;
  return (
    <div className={classNames("side-bar", { showSidebar: toggle === true })}>
      <div className="sidebar-info">
        <div className="sidebar-img-container">
          <img
            src="img/hLUF.JPG"
            alt="this was an image"
            className="sidebar-img"
          />
        </div>
        <h3 className="sidebar-name">Hluf Abebe</h3>
        <div className="sidebar-social-midea-link">
          <SocilaMideaLink linkto={"#"} Icon={FaFacebook} />
          <SocilaMideaLink linkto={"#"} Icon={FaLinkedin} />
          <SocilaMideaLink linkto={"#"} Icon={FaTelegram} />
          <SocilaMideaLink linkto={"#"} Icon={FaGithub} />
          <SocilaMideaLink linkto={"#"} Icon={FaInstagram} />
        </div>
      </div>
      <NavLink Icon={AiTwotoneHome} text={"Home"} linkto={"#"} />
      <NavLink Icon={FaUser} text={"About"} linkto={"#About"} />
      <NavLink Icon={AiFillFileText} text={"Resume"} linkto={"#resume"} />
      <NavLink
        Icon={AiOutlineProject}
        text={"Portfolio"}
        linkto={"#portfolio"}
      />
      <NavLink Icon={MdComputer} text={"Skills"} linkto={"#"} />
      <NavLink
        Icon={MdOutlineLocalPostOffice}
        text={"Contact"}
        linkto={"#contact"}
      />
    </div>
  );
}

export default SideBar;
