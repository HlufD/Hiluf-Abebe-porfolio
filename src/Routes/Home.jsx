import { useContext } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import SideBar from "../components/SideBar";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { myContext } from "../context/myContext";
function Home() {
  const context = useContext(myContext);
  const { toggle, setToggle } = context;

  function onClickHandler() {
    setToggle(!toggle);
  }
  return (
    <div className="home">
      <SideBar />
      <div className="overlay">
        <span className="im">Hluf Abebe</span>
        <Typewriter
          options={{
            strings: ["frontend web developer", "backend web developer"],
            autoStart: true,
            loop: true,
          }}
        />
        <motion.button
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="download"
        >
          Download Cv
        </motion.button>
      </div>
      <div className="hamburger-container">
        {toggle ? (
          <AiOutlineClose className="icon" onClick={onClickHandler} />
        ) : (
          <AiOutlineMenu className="icon" onClick={onClickHandler} />
        )}
      </div>
    </div>
  );
}

export default Home;
