import PortfolioCard from "../components/PortfolioCard";
import { motion } from "framer-motion";

function Portfolio() {
  return (
    <div className="portfolio" id="portfolio">
      <h3 className="about-title">Projects</h3>
      <motion.div className="portfolio-wrapper">
        <PortfolioCard
          title="Abayneh Law"
          link="https://www.abbaylaw.com/"
          text="This website was build for Abbayneh Badeg .It provides information and service give by the lawyer.It has also a blog functionality. "
          technologies={["React", "Mysql", "Express", "CSS"]}
          img="./img/abbaylaw.png"
        />
        <PortfolioCard
          title="St.Michael "
          link="https://saintmichael.edu.et/"
          text="This website was build for St.Michael Business and IT Insititute .It provides information and about service give by the the inistitute."
          technologies={["React", "Ant Design", "CSS"]}
          img="./img/stMichel.jpg"
        />
      </motion.div>
    </div>
  );
}

export default Portfolio;
