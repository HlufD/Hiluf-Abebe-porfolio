import { animate, motion } from "framer-motion";
function App() {
  return (
    <div>
      <motion.button
        className="btn"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 40, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Click me
      </motion.button>
    </div>
  );
}

export default App;
