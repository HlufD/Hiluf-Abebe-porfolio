function About() {
  return (
    <div className="About" id="About">
      <h3 className="about-title">About</h3>
      <p className="about-text">
        Enthusiastic Electrical and Computer Engineering graduate from
        University of Gondar (CGAP 3.05), with clear understanding of object
        oriented programing, web development and embedded systems. Motivated to
        learn, grow and excel in Electrical, Computer Engineering and other
        related fields.
      </p>
      <div className="about-img-con">
        <img src="./img/programming.svg" alt="img here" />
      </div>
      <div className="about-details">
        <h3> Fullstack Developer</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates,
          nostrum culpa est eaque ea amet aliquam quae quidem quo blanditiis,
          praesentium?
        </p>
        <ul>
          <li>Bithday:12-12-2012</li>
          <li>website:www.hlufabebe.com</li>
          <li>Phone: 0937941318</li>
          <li>City: Addis Ababa</li>
          <li>Age:23</li>
          <li>Dergree:Bsc</li>
          <li>email:hlufabebe2015@gmail.com</li>
          <li>Freelance:Available</li>
        </ul>
      </div>
      <div>
        <h3>Skills</h3>
        <div>
          <label for="Html">HTML:</label>

          <progress id="Html" max="100" value="90">
            90%
          </progress>
        </div>
        <div>
          <label for="Css">CSS:</label>

          <progress id="Css" max="100" value="90">
            80%
          </progress>
        </div>
        <div>
          <label for="javaScript">javaScript:</label>

          <progress id="javaScript" max="100" value="90">
            80%
          </progress>
        </div>
        <div>
          <label for="TypeScipt">TypeScipt:</label>

          <progress id="TypeScipt" max="100" value="50">
            50%
          </progress>
        </div>
        <div>
          <label for="NodeJs">NodeJs:</label>

          <progress id="NodeJs" max="100" value="60">
            60%
          </progress>
        </div>
        <div>
          <label for="ReactJs">ReactJs:</label>

          <progress id="ReactJs" max="100" value="60">
            60%
          </progress>
        </div>
        <div>
          <label for="Git">Git:</label>

          <progress id="Git" max="100" value="60">
            60%
          </progress>
        </div>
        <div>
          <label for="Mysql">Mysql:</label>

          <progress id="Mysql" max="100" value="60">
            60%
          </progress>
        </div>
        <div>
          <label for="MongoDb">MongoDb:</label>

          <progress id="MongoDb" max="100" value="60">
            60%
          </progress>
        </div>
        <div>
          <label for="">:</label>

          <progress id="" max="100" value="60">
            60%
          </progress>
        </div>
      </div>
      <div>
        <h3 className="about-resume">Resume</h3>
      </div>
    </div>
  );
}

export default About;
