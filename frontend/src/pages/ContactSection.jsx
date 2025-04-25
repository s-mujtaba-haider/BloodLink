// ContactSection.jsx
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_5ipa3pm", // EmailJS Service ID
        "template_ykd039y", // EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "hHudKAo4jNqA0NsT-" // EmailJS Public Key
      )
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" }); // Clear form after submission
      })
      .catch((error) => console.error("EmailJS Error:", error));
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <section id="contact" className="contact-section">
  <div className="contact-content">
    <div className="contact-inf">
      <h2>Contact Us</h2>
      <p className="intro-text">
        We'd love to hear from you! Whether you have a question, feedback, or just want to say hi — drop us a message.
      </p>
      <div className="contact-details">
        <div className="detail-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>123 Avenue Street, Cityville, Country</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-phone"></i>
          <span>+123 456 7890</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-envelope"></i>
          <span>contact@yourdomain.com</span>
        </div>
        <div className="detail-item">
          <i className="fas fa-clock"></i>
          <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
        </div>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>

    <div className="contact-form-wrapper">
      {submitted && (
        <p className="success-message">✅ Message sent successfully!</p>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contact-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-input"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
          className="contact-textarea"
        />
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  </div>
</section>

  );
};
