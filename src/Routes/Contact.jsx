import { MdLocationOn, MdEmail, MdSettingsCell } from "react-icons/md";
import Input from "../components/Input";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="contact" id="contact">
      <h3 className="about-title">Contact</h3>
      <section className="card-container">
        <motion.div
          className="right info-con"
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="one-row">
            <span className="icon-container">
              <MdLocationOn />
            </span>
            <div className="txt-info">
              <h3>Location</h3>
              <p>Addis Ababa,Ethiopia</p>
            </div>
          </div>
          <div className="one-row">
            <span className="icon-container">
              <MdEmail />
            </span>
            <div className="txt-info">
              <h3>Email</h3>
              <p>hlufabebe2015@gmail.com</p>
            </div>
          </div>
          <div className="one-row">
            <span className="icon-container">
              <MdSettingsCell />
            </span>
            <div className="txt-info">
              <h3>Phone No</h3>
              <p>+251-937941318</p>
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31523.79044565987!2d38.76738397910156!3d9.020469200000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b855cd643a691%3A0x5ce3922436b4f99a!2sMegenagna!5e0!3m2!1sen!2set!4v1670844192558!5m2!1sen!2set"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
        <motion.form
          className="right form-wrapper"
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="wrapper-all">
            <Input label="Full Name" linkto="name" type="text" />
            <Input label="Email" linkto="email" type="email" />
            <Input label="Subject" linkto="subject" type="text" />
            <div className="input-wrapper">
              <label htmlFor="#message" style={{ marginBottom: ".4rem" }}>
                Message
              </label>
              <textarea name="" id="#message" cols="30" rows="10"></textarea>
            </div>
            <button className="btn">Send Message</button>
          </div>
        </motion.form>
      </section>
    </div>
  );
};

export default Contact;
