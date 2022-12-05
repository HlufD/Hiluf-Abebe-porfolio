import React from "react";

function NavLink({ Icon, text, linkto }) {
  return (
    <div className="sidebar-nav">
      <div className="nav-container">
        <Icon className="nav-icon" />
        <a href={linkto}>{text}</a>
      </div>
    </div>
  );
}

export default NavLink;
