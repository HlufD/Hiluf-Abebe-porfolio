import {
  FaFacebook,
  FaTelegram,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaHome,
  FaUser,
  FaBook,
  FaList,
  FaVoicemail,
} from "react-icons/fa";
import { GiMailbox } from "react-icons/gi";

import("./SideBar.style.css");

function SideBar() {
  return (
    <div className="side-bar">
      <div className="sidebar-info">
        <div className="sidebar-img-container">
          <img
            src="img/hluf.JPG"
            alt="this was an image"
            className="sidebar-img"
          />
        </div>
        <h3 className="sidebar-name">Hluf Abebe</h3>
        <div className="sidebar-social-midea-link">
          <a href="#" className="social-icon-containare">
            <FaFacebook className="social-icon" />
          </a>
          <a href="#" className="social-icon-containare">
            <FaLinkedin className="social-icon" />
          </a>
          <a href="#" className="social-icon-containare">
            <FaTelegram className="social-icon" />
          </a>
          <a href="#" className="social-icon-containare">
            <FaGithub className="social-icon" />
          </a>
          <a href="#" className="social-icon-containare">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
      <div className="sidebar-nav">
        <div className="nav-container">
          <FaHome className="nav-icon" />
          <a href="#">Home</a>
        </div>
        <div className="nav-container">
          <FaUser className="nav-icon" />
          <a href="#">About</a>
        </div>
        <div className="nav-container">
          <FaBook className="nav-icon" />
          <a href="#">Resume</a>
        </div>
        <div className="nav-container">
          <FaList className="nav-icon" />
          <a href="#">Portfolio</a>
        </div>
        <div className="nav-container">
          <GiMailbox className="nav-icon" />
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
