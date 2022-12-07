import {
  FaFacebook,
  FaTelegram,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaHome,
  FaUser,
} from "react-icons/fa";
import { AiOutlineProject, AiFillFileText } from "react-icons/ai";
import { MdOutlineLocalPostOffice, MdComputer } from "react-icons/md";
import classNames from "classnames";
import NavLink from "./NavLink";
import SocilaMideaLink from "./SocilaMideaLink";

import("./SideBar.style.css");

function SideBar({ toggel }) {
  return (
    <div className={classNames("side-bar", { showSidebar: toggel === true })}>
      <div className="sidebar-info">
        <div className="sidebar-img-container">
          <img
            src="img/back.jpg"
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
      <NavLink Icon={FaHome} text={"Home"} linkto={"#"} />
      <NavLink Icon={FaUser} text={"About"} linkto={"#"} />
      <NavLink Icon={AiFillFileText} text={"Resume"} linkto={"#"} />
      <NavLink Icon={AiOutlineProject} text={"Portfolio"} linkto={"#"} />
      <NavLink Icon={MdComputer} text={"Skills"} linkto={"#"} />
      <NavLink Icon={MdOutlineLocalPostOffice} text={"Contact"} linkto={"#"} />
    </div>
  );
}

export default SideBar;
