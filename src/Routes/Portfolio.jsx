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
      </motion.div>
    </div>
  );
}

export default Portfolio;
