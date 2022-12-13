import About from "./Routes/About";
import Contact from "./Routes/Contact";
import Home from "./Routes/Home";
import Resume from "./Routes/Resume";
import Portfolio from "./Routes/Portfolio";
import { MdOutlineCopyright } from "react-icons/md";

function App() {
  return (
    <div className="App">
      <Home />
      <About />
      <Resume />
      <Portfolio />
      <Contact />
      <div className="footer">
        <p className="copy">
          <MdOutlineCopyright /> Cpoyright {new Date().getFullYear()}
        </p>
        <p>Developed by Hluf Abebe</p>
      </div>
    </div>
  );
}

export default App;
