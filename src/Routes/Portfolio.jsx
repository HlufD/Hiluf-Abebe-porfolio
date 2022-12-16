import { MdPlayCircleOutline, MdCode } from "react-icons/md";
import PortfolioCard from "../components/PortfolioCard";

function Portfolio() {
  return (
    <div className="portfolio" id="portfolio">
      <h3 className="about-title">Projects</h3>
      <div className="portfolio-wrapper">
        <PortfolioCard
          title="Abayneh Law"
          link="https://www.abbylaw.com"
          text="This website was build for Abbayneh Badeg as "
          technologies={["React", "Mysql", "Express", "CSS"]}
          img="./img/abbaylaw.png"
        />
      </div>
    </div>
  );
}

export default Portfolio;
