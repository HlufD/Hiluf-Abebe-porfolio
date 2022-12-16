import { useState } from "react";
import About from "./Routes/About";
import Contact from "./Routes/Contact";
import Home from "./Routes/Home";
import Resume from "./Routes/Resume";
import Portfolio from "./Routes/Portfolio";
import { MdOutlineCopyright } from "react-icons/md";

import { myContext } from "./context/myContext";

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <myContext.Provider value={{ toggle, setToggle }}>
      <div className="App">
        <Home />
        <About />
        <Resume />
        <Portfolio />
        <Contact />
        <div className="footer">
          <p className="copy">
            <MdOutlineCopyright /> Copyright {new Date().getFullYear()}
          </p>
          <p>Developed by Hluf Abebe</p>
        </div>
      </div>
    </myContext.Provider>
  );
}

export default App;
