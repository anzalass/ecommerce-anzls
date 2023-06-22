import React from "react";
import Layout from "../components/Layout/Layout";
import bgcontact from "../images/bannercopy.png";

function Contact() {
  return (
    <Layout title={"Contact Me"}>
      <div className="contact">
        <div className="contactHeader">
          <img src={bgcontact} alt="" className="bgcontact" />
          <div className="contactTiltle">
            <h1>Contact ME</h1>
            <p>For More Information</p>
          </div>
        </div>
        <div className="contactDetail">
          <div className="details">
            <span>Get In Touch</span>
            <h2>Visit Our Agency or Contact me for Inquired</h2>
            <div>
              <li>
                <i className="fal fa-map" />
                <p>Hogwarts Central Capital District No 99</p>
              </li>
              <li>
                <i className="fal fa-envelope" />
                <p>evosmessi@gmail.com</p>
              </li>
              <li>
                <i className="fal fa-phone-alt" />
                <p>0877-3456-0987</p>
              </li>
              <li>
                <i className="fal fa-clock" />
                <p>Every Day</p>
              </li>
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63475.74668283443!2d106.49984918807584!3d-6.0991321302924835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e41fe31616689d5%3A0x9a0254f3f655c57f!2zNsKwMDUnNTYuOSJTIDEwNsKwMzEnMDguMyJF!5e0!3m2!1sen!2sid!4v1673093992280!5m2!1sen!2sid"
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
