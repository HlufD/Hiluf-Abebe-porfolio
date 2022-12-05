import { useState } from "react";

import SideBar from "../components/SideBar";
import("./Home.style.css");
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function Home() {
  const [toggel, setToggel] = useState(false);

  function onClickHandler() {
    setToggel(!toggel);
  }

  function togleSideBar() {
    setOpenSideBar(true);
  }
  return (
    <div className="home">
      <SideBar toggel={toggel} />
      <div className="hamburger-container">
        {toggel ? (
          <AiOutlineClose className="icon" onClick={onClickHandler} />
        ) : (
          <AiOutlineMenu className="icon" onClick={onClickHandler} />
        )}
      </div>
    </div>
  );
}

export default Home;
