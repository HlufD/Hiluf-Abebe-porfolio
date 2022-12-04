import { useState } from "react";

import SideBar from "../components/SideBar";
import("./Home.style.css");
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function Home() {
  const [toggel, setToggel] = useState(false);

  function onClickHandler() {
    setToggel(!toggel);
  }

  return (
    <div className="home">
      <SideBar />
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
