import { useState } from "react";

import SideBar from "../components/SideBar";
import("./Home.style.css");
import { FaHamburger, FaWindowClose } from "react-icons/fa";

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
          <FaWindowClose className="icon" onClick={onClickHandler} />
        ) : (
          <FaHamburger className="icon" onClick={onClickHandler} />
        )}
      </div>
    </div>
  );
}

export default Home;
