import { motion } from "framer-motion";
let delay = 0.3;
function SocilaMideaLink({ linkto, Icon }) {
  {
    delay = delay + 0.2;
  }
  return (
    <motion.a
      href={linkto}
      className="social-icon-containare"
      initial={{ y: 30, opacity: 0, backgroundColor: "rgb(31, 143, 217)" }}
      transition={{ delay: delay, duration: 0.5 }}
      animate={{ y: 0, opacity: 1, backgroundColor: "#212431" }}
      target="_blank"
    >
      <Icon className="social-icon" />
    </motion.a>
  );
}

export default SocilaMideaLink;
