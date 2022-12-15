import { motion } from "framer-motion";

const ProgressBar = ({ lebele, percent }) => {
  return (
    <motion.div
      className="proress-bar"
      initial={{ y: 100, opacity: 0 }}
      transition={{ duration: 1, type: "spring", bounce: 0.3 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="labele">
        <p>{lebele}</p>
        <p>{percent}</p>
      </div>
      <div className="actual-progress-con">
        <motion.div
          className="actual-progress"
          initial={{ width: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ width: `${percent}` }}
          viewport={{ once: true, amount: 0.5 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default ProgressBar;
//style={{ width: `${percent}` }}
