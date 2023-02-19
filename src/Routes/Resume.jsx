import React from "react";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <div className="resume" id="resume">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h3 className="about-resume">Resume</h3>
        <p className="resume-intro"></p>
      </motion.div>
      <section>
        {/* start of sumary */}
        <motion.div
          className="sumary"
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className="section-title">Summary</h3>
          <div className="resume-title-wrapper">
            <span className="circle"></span>
            <p>Hluf Abebe</p>
          </div>
          <div className="wraper-sumary">
            <div className="sumary-about-me">
              <p>
                I am a self taught fullstack web developer with strong
                foundations how the web works and i am Proficient with HTML,
                CSS, javaScript. My Tech stack is
                MERN(MongoDb,Express,React,Node) and can work with different
                programing paradigms.
              </p>
              <ul>
                <li>Addis Ababa Ethiopia</li>
                <li>+251-937-941318</li>
                <li>hlufabebe2015@gmail.com</li>
              </ul>
            </div>
          </div>
        </motion.div>
        {/* end of sumary */}

        {/* start od education */}
        <motion.div
          className="sumary"
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className="section-title">Education</h3>
          <div className="resume-title-wrapper">
            <span className="circle"></span>
            <p>
              Computer Engineering
              <span style={{ textTransform: "capitalize" }}>(Bsc)</span>
            </p>
          </div>
          <div className="wraper-sumary">
            <div className="sumary-about-me">
              <p className="from">2017-2022</p>
              <p style={{ fontWeight: 700 }}>University of Gondar</p>
              <p>
                I have a Bsc in Electrical and Computer Engineering (Computer
                Engineering) . major courses i took :
                <ul>
                  <li>Data Structures and Algorithms</li>
                  <li>Java(object oriented programing)</li>
                  <li>Database(mysql)</li>
                  <li>c++ programing</li>
                </ul>
              </p>
            </div>
          </div>

          <div className="resume-title-wrapper">
            <span className="circle"></span>
            <p>JavaScript Development</p>
          </div>
          <div className="wraper-sumary">
            <div className="sumary-about-me">
              <p className="from">2019-2022</p>
              <p style={{ fontWeight: 700 }}>Udemy</p>
              <p>
                i Learned javaScript the advanced concepts from udemy and i have
                a certificate in javasCript.
              </p>
              <h4>Topicsi covered</h4>
              <ul>
                <li>The v8 engine</li>
                <li>Colures</li>
                <li>prototypal inheritance</li>
                <li>asynchronous programing</li>
                <li>Classical Inheritance</li>
              </ul>
            </div>
          </div>
        </motion.div>
        {/* end of educaton */}
        {/* start of expriance */}
        <motion.div
          className="sumary"
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className="section-title">Experience</h3>
          <div className="resume-title-wrapper">
            <span className="circle"></span>
            <p>Fullstack Web Developer</p>
          </div>
          <div className="wraper-sumary">
            <div className="sumary-about-me">
              <p className="from">2022 - Present</p>
              <p style={{ fontWeight: 700 }}>
                St.Michael Business and IT Institute(Addis Ababa, Ethiopia)
              </p>
              <ul>
                <li>
                  Lead in the design, development, and implementation of the
                  graphic, layout, and production communication materials.
                </li>
                <li>
                  Delegate tasks to the 7 members of the design team and provide
                  counsel on all aspects of the project.
                </li>
                <li>
                  Supervise the assessment of all graphic materials in order to
                  ensure quality and accuracy of the development.
                </li>
              </ul>
            </div>
            <div className="sumary-about-me">
              <p className="from">2019 - Present</p>
              <p style={{ fontWeight: 700 }}>Flreelancing</p>
              <ul>
                <li>Frontend development using React</li>
                <li>Backend Development uning Node and Express</li>
                <li>Designning and dveloping Databases</li>
              </ul>
            </div>
          </div>
        </motion.div>
        {/* end of expriance */}
      </section>
    </div>
  );
};

export default Resume;
