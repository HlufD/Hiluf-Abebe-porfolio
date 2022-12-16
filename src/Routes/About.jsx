import { FaAngleRight } from "react-icons/fa";
import List from "../components/List";
import ProgressBar from "../components/ProgressBar";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="About" id="About">
      <div className="more-about">
        <motion.div
          className="right-side"
          initial={{ x: -100, opacity: 0 }}
          transition={{ duration: 1.3, type: "spring", bounce: 0.3 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className="about-title">About</h3>
          <p className="about-text">
            Enthusiastic Electrical and Computer Engineering graduate from
            University of Gondar, with clear understanding of object oriented
            programing, web development and embedded systems. Motivated to
            learn, grow and excel in Electrical, Computer Engineering and other
            related fields.
          </p>
          <div className="about-img-con">
            <img src="./img/programming.svg" alt="img here" />
          </div>
        </motion.div>
        <motion.div
          className="about-details"
          initial={{ x: 100, opacity: 0 }}
          transition={{ duration: 1.4, type: "spring", bounce: 0.3 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className="About-intro"> Fullstack Developer</h3>
          <p className="About-me">
            I am a Fullstack web developer with hands on experience with
            developing static and dynamic websites and web apps with the current
            web technologies.
          </p>
          <ul>
            <List text={"Birthday"} value={"13-13-2043"} />
            <List text={"website"} value={"www.hlufabebe.com"} />
            <List text={"Phone"} value={"0937941318"} />
            <List text={"City"} value={"Addis Ababa"} />
            <List text={"Age"} value={"23"} />
            <List text={"Degree"} value={"Bsc"} />
            <List text={"email"} value={"hlufabebe2015@gmail.com"} />
            <List text={"Freelance"} value={"Available"} />
          </ul>
        </motion.div>
      </div>
      <div className="skills">
        <h3 className="about-title">Skills</h3>
        <p className="About-me">
          I have different level of skill on the following technologies and i
          have worked on them for the last couple of years.if you want to hire
          me contact me through +251-937941318
        </p>
        <div className="skill-wraper">
          <div>
            <ProgressBar lebele={"html"} percent={"100%"} />
            <ProgressBar lebele={"css"} percent={"90%"} />
            <ProgressBar lebele={"javaScript"} percent={"80%"} />
            <ProgressBar lebele={"typeScript"} percent={"80%"} />
            <ProgressBar lebele={"ReactJs"} percent={"80%"} />
          </div>
          <div>
            <ProgressBar lebele={"NodeJs"} percent={"80%"} />
            <ProgressBar lebele={"MonoDb"} percent={"80%"} />
            <ProgressBar lebele={"Mysql"} percent={"70%"} />
            <ProgressBar lebele={"Git"} percent={"70%"} />
            <ProgressBar lebele={"php"} percent={"50%"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
