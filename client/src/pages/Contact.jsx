import React from 'react'
import { useState } from "react";
import { useAuth } from '../store/Auth';
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import "./Contact.css";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from 'react-toastify';

const defaultContactFormData = {
    username: "",
    email: "",
    message: "",
  };
const Contact = () => {

  const [contact, setContact] = useState(defaultContactFormData);
  const [userData, setUserData] = useState(true);

  const { user, API} = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    //setContact({
    // ...contact,
    //[name]: value,});

    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/form/contact`,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(contact),
      });

      if(response.ok){
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast.success("Message sent successfully");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section>
      <main>
        <div className="contact-section-registration">
          <div className='contact-section'>
              {/*Connect with me*/}
            <section id="contact" className="contact-subsection">
              <h2 className="contact-title">Connect with Me</h2>

              <div className="contact-icons">
                <a
                  href="https://www.linkedin.com/in/aman-chouhan-78692022b/"
                  target="_blank"
                  className='icon linkedin'
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://github.com/amanchouhan01"
                  target="_blank"
                  className='icon github'
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://x.com/AmanChouhan01"
                  className="icon x"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                >
                  <FaXTwitter />
                </a>
              </div>
            </section>

            {/* our main registration code  */}
            <div className="contact-registration-form">
              <h1 className="main-heading mb-3">Contact Me</h1>
              <br />
              <form onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    name="username"
                    id='username'
                    required
                    autoComplete='off'
                    placeholder="Enter your Name"
                    value={contact.username}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id='email'
                    required
                    autoComplete='off'
                    placeholder="Enter your Email"
                    value={contact.email}
                    onChange={handleInput}

                  />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    required
                    autoComplete="off"
                    id='message'
                    placeholder="Message"
                    value={contact.message}
                    onChange={handleInput}
                    rows="6"
                  />
                </div>

                <br />
                <button type="submit" className="btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1094.0997099697565!2d77.1680590278673!3d28.541478568164845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1dc4a58af30b%3A0xa33ad58a5808be5e!2sNew%20Delhi%2C%20Delhi%20110067!5e0!3m2!1sen!2sin!4v1768572926089!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
    </section>
  )
}

export default Contact
