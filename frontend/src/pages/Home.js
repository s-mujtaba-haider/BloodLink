import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { ContactSection } from "./ContactSection";


const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="hero section light-background w-full">
  <img
    src={`${process.env.PUBLIC_URL}/assets/img/hero-bg.jpg`}
    alt="Hero Background"
    className="w-full h-auto"
  />

  <div className="container position-relative">
    <div id="home" className="welcome position-relative" data-aos="fade-down" data-aos-delay="100">
      <h2>WELCOME TO BLOOD LINK</h2>
      <p>Connecting Lives, One Drop at a Time.</p>
    </div>

    <div className="content row gy-4">
      <div className="col-lg-4 d-flex align-items-stretch">
        <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
          <h3>Why Choose BloodLink?</h3>
          <p>BloodLink bridges the gap between those in urgent need and generous blood donors. With real-time tracking, verified profiles, and location-based matching, we make every drop count.</p>
          <div className="btn-home">
                  <a href="#about" className="more-btn">
          <span>Learn More</span> <i className="bi bi-chevron-right"></i>
        </a>

          </div>
        </div>
      </div>

      <div className="col-lg-8 d-flex align-items-stretch">
        <div className="d-flex flex-column justify-content-center">
          <div className="row gy-4">
            <div className="col-xl-4 d-flex align-items-stretch">
              <div className="icon-box" data-aos="zoom-out" data-aos-delay="300">
                <i className="bi bi-clipboard-data"></i>
                <h4>Smart Matching</h4>
                <p>Our system instantly matches donors and recipients based on blood type, location, and urgency to ensure the fastest possible response.</p>
              </div>
            </div>

            <div className="col-xl-4 d-flex align-items-stretch">
              <div className="icon-box" data-aos="zoom-out" data-aos-delay="400">
                <i className="bi bi-gem"></i>
                <h4>Verified Donors</h4>
                <p>Every donor profile is verified to maintain safety, trust, and transparency across the entire donation process.</p>
              </div>
            </div>

            <div className="col-xl-4 d-flex align-items-stretch">
              <div className="icon-box" data-aos="zoom-out" data-aos-delay="500">
                <i className="bi bi-inboxes"></i>
                <h4>24/7 Support</h4>
                <p>Our dedicated support team is available around the clock to assist you with emergencies, queries, and follow-ups.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</section>

{/* Stats Section */}
<section id="stats" className="stats section1">
  <div className="container" data-aos="fade-up" data-aos-delay="100">
    <div className="row">
      {[
        { icon: "fa-user-doctor", label: "Doctors", count: 85 },
        { icon: "fa-hospital", label: "Departments", count: 18 },
        { icon: "fa-flask", label: "Research Labs", count: 12 },
        { icon: "fa-award", label: "Awards", count: 150 },
      ].map((stat, index) => (
        <div key={index} className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
          <i className={`fa-solid ${stat.icon}`} style={{ fontSize: "24px" }}></i>
          <div className="stats-item">
            <CountUp start={0} end={stat.count} duration={5} />
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


<section id="about" className="about-section">
  <div className="about-container">
    <div className="about-image">
      <img src="https://ssbhealthcare.com/wp-content/uploads/2023/06/close-up-patient-with-tubes-her-arm-squeezing-ball-her-hand-while-donating-blood_1200x800.jpg" alt="Blood Donation" />
    </div>
    <div className="about-text">
      <h2>About Blood Link</h2>
      <p>
        Blood Link is a dedicated platform connecting blood donors with those in urgent need.
        Our mission is to save lives by simplifying and streamlining the blood donation process.
        Whether you're looking to donate or in search of a donor, Blood Link ensures a fast,
        safe, and reliable experience.
      </p>

        <a href="#contact" className="more-btn">
          <span>Contact Us</span> <i className="bi bi-chevron-right"></i>
        </a>

      
    </div>
  </div>
</section>



        {/* Services Section */}
<section id="services" className="services section">
<div id="services" className="container section-title" data-aos="fade-up">
    <h2>Services</h2>
    <p>Explore the wide range of services we offer to meet your needs and elevate your experience with professional care and innovation.</p>
  </div>

  <div className="container">
    <div className="row gy-4">
      {[
        {
          icon: "fa-heartbeat",
          title: "Health Monitoring",
          desc: "Real-time tracking of vital signs and health metrics to ensure early detection and better management of health conditions."
        },
        {
          icon: "fa-pills",
          title: "Medication Assistance",
          desc: "Personalized reminders and medication plans to help you stay on track with your prescriptions and treatments."
        },
        {
          icon: "fa-hospital-user",
          title: "Patient Care Services",
          desc: "Comprehensive support for patients including routine checkups, consultations, and home care management by experts."
        },
        {
          icon: "fa-dna",
          title: "Genetic Testing",
          desc: "Advanced genetic analysis to provide insights into hereditary conditions and help tailor personalized health strategies."
        },
        {
          icon: "fa-wheelchair",
          title: "Rehabilitation Support",
          desc: "Tailored rehab programs and support services to assist individuals in recovering mobility and independence post-treatment."
        },
        {
          icon: "fa-notes-medical",
          title: "Medical Records Management",
          desc: "Secure digital storage and easy access to your complete medical history for more informed healthcare decisions."
        },
      ].map((service, index) => (
        <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
          <div className="service-item position-relative">
            <div className="icon">
              <i className={`fas ${service.icon}`}></i>
            </div>
            <a href="#" className="stretched-link">
              <h3>{service.title}</h3>
            </a>
            <p>{service.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<div>
      {/* Other content */}
      <ContactSection />
    </div>

    <section className="location-fast mt-5" data-aos="fade-up" data-aos-delay="200">
  <div className="container">
    <div className="location-title text-center mb-3">
      <h4>Our Location – FAST NUCES Lahore</h4>
    </div>
    <div className="location-map rounded-3 shadow overflow-hidden" style={{ height: "200px" }}>
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
</section>


    



      </div>
    </div>
  );
};

export default Home;
