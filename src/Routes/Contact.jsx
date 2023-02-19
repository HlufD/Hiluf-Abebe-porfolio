import { MdLocationOn, MdEmail, MdSettingsCell } from "react-icons/md";
import Input from "../components/Input";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useRef, useState, useContext } from "react";
import classNames from "classnames";
import { myContext } from "../context/myContext";

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const { setEmail, email, onChangeHandler } = useContext(myContext);

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_g3wwi3t",
        "template_1cob6yi",
        form.current,
        "6847iHCddkSjz_Y1v"
      )
      .then(
        (result) => {
          setEmail({
            ...email,
            from_name: "",
            from_email: "",
            subject: "",
            message: "",
          });
          setSent(true);
          setTimeout(() => {
            setSent(false);
          }, 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  console.log(form);
  return (
    <div className="contact" id="contact">
      <h3 className="about-title">Contact</h3>
      <section className="card-container">
        <motion.div
          className="right info-con"
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="one-row">
            <span className="icon-container">
              <MdLocationOn />
            </span>
            <div className="txt-info">
              <p>Addis Ababa,Ethiopia</p>
            </div>
          </div>
          <div className="one-row">
            <span className="icon-container">
              <MdEmail />
            </span>
            <div className="txt-info">
              <p>hlufabebe2015@gmail.com</p>
            </div>
          </div>
          <div className="one-row">
            <span className="icon-container">
              <MdSettingsCell />
            </span>
            <div className="txt-info">
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
          ref={form}
          className="right form-wrapper"
          initial={{ y: 100, opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          onSubmit={sendEmail}
        >
          <div
            className={classNames("snackbar", {
              "show-snackbar": sent === true,
            })}
          >
            <p>Message sent</p>
          </div>
          <div className="wrapper-all">
            <Input
              label="Full Name"
              linkto="name"
              type="text"
              name="from_name"
            />
            <Input
              label="Email"
              linkto="email"
              type="email"
              name="from_email"
            />
            <Input
              label="Subject"
              linkto="subject"
              type="text"
              name="subject"
            />
            <div className="message-wrapper">
              <textarea
                onChange={onChangeHandler}
                name="message"
                id="message"
                cols="30"
                rows="8"
                value={email["message"]}
              ></textarea>
            </div>
            <button className="btn">Send Message</button>
          </div>
        </motion.form>
      </section>
    </div>
  );
};

export default Contact;
