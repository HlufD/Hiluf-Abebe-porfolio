import { FaAngleRight } from "react-icons/fa";
import ProgressBar from "../components/ProgressBar";

function About() {
  return (
    <div className="About" id="About">
      <h3 className="about-title">About</h3>
      <p className="about-text">
        Enthusiastic Electrical and Computer Engineering graduate from
        University of Gondar, with clear understanding of object oriented
        programing, web development and embedded systems. Motivated to learn,
        grow and excel in Electrical, Computer Engineering and other related
        fields.
      </p>
      <div className="about-img-con">
        <img src="./img/programming.svg" alt="img here" />
      </div>
      <div className="about-details">
        <h3 className="About-intro"> Fullstack Developer</h3>
        <p className="About-me">
          I am a Fullstack web developer with hands on experience with
          developing static and dynaminy websites and web apps with the current
          web techonlogies.
        </p>
        <ul>
          <li>
            <FaAngleRight className="about-icon" />
            <span>Bithday:</span>
            12-12-2012
          </li>
          <li>
            <FaAngleRight className="about-icon" />
            <span>website:</span>
            www.hlufabebe.com
          </li>
          <li>
            <FaAngleRight className="about-icon" />
            <span>Phone:</span> 0937941318
          </li>
          <li>
            <FaAngleRight className="about-icon" />
            <span>City:</span>Addis Ababa
          </li>
          <li>
            <FaAngleRight className="about-icon" />
            <span>Age:</span>
            23
          </li>
          <li>
            <FaAngleRight className="about-icon" />
            <span>Dergree:</span>
            Bsc
          </li>
          <li>
            <FaAngleRight className="about-icon" />
            <span>email:</span>
            hlufabebe2015@gmail.com
          </li>
          <li>
            <FaAngleRight className="about-icon" />
            <span>Freelance: </span>
            Available
          </li>
        </ul>
      </div>
      <div className="skills">
        <h3 className="about-title">Skills</h3>
        <p className="About-me">
          I have different level of skill on the following technologies and i
          have worked on them for the last couple of years.if you want to hire
          me you can see the potfolio page.
        </p>
        <ProgressBar lebele={"html"} percent={"100%"} />
        <ProgressBar lebele={"css"} percent={"90%"} />
        <ProgressBar lebele={"javaScript"} percent={"80%"} />
        <ProgressBar lebele={"typeScript"} percent={"80%"} />
        <ProgressBar lebele={"ReactJs"} percent={"80%"} />
        <ProgressBar lebele={"NodeJs"} percent={"80%"} />
        <ProgressBar lebele={"MonoDb"} percent={"80%"} />
        <ProgressBar lebele={"Mysql"} percent={"70%"} />
        <ProgressBar lebele={"Git"} percent={"70%"} />
        <ProgressBar lebele={"php"} percent={"50%"} />
      </div>
      <div>
        <h3 className="about-resume">Resume</h3>
      </div>
    </div>
  );
}

export default About;
