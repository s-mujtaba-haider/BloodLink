import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section id="about" className="about section py-5">
      <div className="container">
        <div className="row gy-4 gx-5">
          {/* Left Column - Image & Play Button */}
          <div
            className="col-lg-6 position-relative align-self-start"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img src="assets/img/about.jpg" className="img-fluid" alt="About Us" />
            <Link
              to="https://youtu.be/DcUGEGAxq9k?si=vvy-RXRApKHq3sUM"
              className="glightbox pulsating-play-btn"
            ></Link>
          </div>

          {/* Right Column - Content */}
          <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
            <h3>About Us</h3>
            <p>
              At BloodLink, we are committed to saving lives by simplifying and accelerating the blood donation process. Our platform connects donors and recipients in real time, ensuring safe, fast, and efficient transfusion support during emergencies and routine medical needs.
            </p>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <i className="fa-solid fa-vial-circle-check fs-4 me-3 text-primary"></i>
                <div>
                  <h5>Trusted & Verified Donors</h5>
                  <p>All blood donors are thoroughly verified to maintain the highest standards of safety and trust within our community.</p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-3">
                <i className="fa-solid fa-pump-medical fs-4 me-3 text-primary"></i>
                <div>
                  <h5>Smart Donation Matching</h5>
                  <p>Our advanced system matches recipients with the nearest and most suitable donors based on blood type and urgency.</p>
                </div>
              </li>
              <li className="d-flex align-items-start">
                <i className="fa-solid fa-heart-circle-xmark fs-4 me-3 text-primary"></i>
                <div>
                  <h5>Emergency Support 24/7</h5>
                  <p>We offer round-the-clock support to ensure no life is lost waiting for a blood donor. Every second counts — and so do you.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps Integration */}
        {/* Google Maps Integration */}
<div className="row mt-5" data-aos="fade-up" data-aos-delay="200">
  <div className="col-md-8 mx-auto">
    <h4 className="mb-3 text-center">Our Location – FAST NUCES Lahore</h4>
    <div className="rounded-3 shadow overflow-hidden" style={{ height: "300px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13603.542642508848!2d74.3030141!3d31.4815212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore!5e0!3m2!1sen!2s!4v1713350529582!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="FAST NUCES Lahore Location"
      ></iframe>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default AboutUs;
