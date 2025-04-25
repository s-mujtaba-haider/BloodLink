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
    <section id="contact" className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Contact Me</h2>

      {submitted && (
        <p className="text-green-600 dark:text-green-400 text-center mt-2">
          ✅ Message sent successfully!
        </p>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="mt-6 space-y-4 bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          rows="5"
        ></textarea>
        <button 
          type="submit" 
          className="w-full bg-blue-600 dark:bg-blue-700 text-white p-3 rounded font-bold hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-200"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};
