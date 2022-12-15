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
        <p className="resume-intro">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut fuga ad
          sed fugiat aperiam minima reiciendis dolor eligendi? Architecto
          delectus voluptas enim excepturi odio inventore beatae esse neque
          voluptates ipsum!
        </p>
      </motion.div>
      <section>
        {/* start of sumary */}
        <motion.div
          className="sumar"
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className="section-title">Sumary</h3>
          <div className="resume-title-wrapper">
            <span className="circle"></span>
            <p>Hluf Abebe</p>
          </div>
          <div className="wraper-sumary">
            <div className="sumary-about-me">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquid illo numquam iure vel, magni quisquam odit fuga
                voluptatibus nemo laboriosam adipisci! Tempora omnis tenetur
                quia ea eveniet illum officiis nesciunt.
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
              Computer Engineerings
              <span style={{ textTransform: "capitalize" }}>(Bsc)</span>
            </p>
          </div>
          <div className="wraper-sumary">
            <div className="sumary-about-me">
              <p className="from">2017-2022</p>
              <p style={{ fontWeight: 700 }}>University of Gondar</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquid illo numquam iure vel, magni quisquam odit fuga
                voluptatibus nemo laboriosam adipisci! Tempora omnis tenetur
                quia ea eveniet illum officiis nesciunt.
              </p>
            </div>
          </div>

          <div className="resume-title-wrapper">
            <span className="circle"></span>
            <p>JavaScript Developer</p>
          </div>
          <div className="wraper-sumary">
            <div className="sumary-about-me">
              <p className="from">2021-2022</p>
              <p style={{ fontWeight: 700 }}>Udemy</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aliquid illo numquam iure vel, magni quisquam odit fuga
                voluptatibus nemo laboriosam adipisci! Tempora omnis tenetur
                quia ea eveniet illum officiis nesciunt.
              </p>
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
          <h3 className="section-title">Expriance</h3>
          <div className="resume-title-wrapper">
            <span className="circle"></span>
            <p>Fullstack Web Developer</p>
          </div>
          <div className="wraper-sumary">
            <div className="sumary-about-me">
              <p className="from">2022 - Present</p>
              <p style={{ fontWeight: 700 }}>
                St.Michael Business and It Intsitute(Addis Ababa Ethiopia)
              </p>
              <ul>
                <li>
                  Lead in the design, development, and implementation of the
                  graphic, layout, and production communication materials
                </li>
                <li>
                  Delegate tasks to the 7 members of the design team and provide
                  counsel on all aspects of the project.
                </li>
                <li>
                  Supervise the assessment of all graphic materials in order to
                  ensure quality and accuracy of the de
                </li>
                <li>
                  Oversee the efficient use of production project budgets
                  ranging from $2,000 - $25,000
                </li>
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
