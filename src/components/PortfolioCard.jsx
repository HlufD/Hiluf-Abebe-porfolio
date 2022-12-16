import { motion } from "framer-motion";

const PortfolioCard = ({ title, link, text, technologies, img }) => {
  return (
    <motion.div
      className="project-container"
      initial={{ y: 100, opacity: 0 }}
      transition={{ duration: 2, type: "spring", bounce: 0.3 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <p className="pro-title">{title}</p>
      <div className="img-con">
        <a href={link} target="_blank">
          <img src={img} alt="alt" />
        </a>
      </div>
      <motion.div
        className="side-in from-right"
        initial={{ y: 100, opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p>{text}</p>
      </motion.div>
      <motion.div
        className="side-in from-left"
        initial={{ y: 70, opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span style={{ fontWeight: "bold" }}>Built In:</span>
        {technologies.map((tech, index) => {
          return <p key={index}>{tech}</p>;
        })}
      </motion.div>
    </motion.div>
  );
};

export default PortfolioCard;
