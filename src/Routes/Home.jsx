import { useState } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
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
      <SideBar toggel={toggel} />
      <div className="overlay">
        <span className="im">I'm</span>
        <Typewriter
          options={{
            strings: ["frontend web developer", "backend web developer"],
            autoStart: true,
            loop: true,
          }}
        />
        <motion.button
          initial={{ x: -100, y: -100 }}
          animate={{ x: 0, y: 0 }}
          className="download"
        >
          Download Cv
        </motion.button>
      </div>
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
