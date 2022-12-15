import { MdPlayCircleOutline, MdCode } from "react-icons/md";
import PortfolioCard from "../components/PortfolioCard";

function Portfolio() {
  return (
    <div className="portfolio" id="portfolio">
      <h3 className="about-title">Portfolio</h3>
      <div className="portfolio-wrapper">
        <PortfolioCard
          title="Abayneh Badeg"
          link="https://abbaylaw.com"
          text="This project is a law firm website that provides iformation and
          service given by Lawyer Abbayneh Badeg and has a Blog functionalies."
          technologies={["React", "Material Ui", "NodeJs", "Mysql"]}
          img="./img/abbaylaw.png"
        />
      </div>
    </div>
  );
}

export default Portfolio;
