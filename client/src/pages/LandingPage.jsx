import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../css/LandingPage.css";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
     const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const SERVICES = [
    "Web Development",
    "App Development",
    "Google Ads",
    "Data Analytics",
    "Digital Marketing",
    "UI/UX Design",
  ];

  const FEATURES = [
    {
      icon: "🚀",
      title: "Fast Delivery",
      description: "Quick turnaround times for all your projects",
    },
    {
      icon: "💼",
      title: "Professional Team",
      description: "Experienced professionals for quality work",
    },
    {
      icon: "🛡️",
      title: "Secure & Reliable",
      description: "Your data and projects are safe with us",
    },
    {
      icon: "📈",
      title: "Growth Focused",
      description: "Solutions designed for your business growth",
    },
  ];

  const SERVICES_DATA = [
    {
      icon: "🌐",
      title: "Web Development",
      description:
        "Responsive, modern websites and web applications built with latest technologies",
      features: ["React.js", "Node.js", "MongoDB", "Responsive Design"],
    },
    {
      icon: "📱",
      title: "App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "iOS", "Android"],
    },
    {
      icon: "🎯",
      title: "Google Ads",
      description:
        "Strategic PPC campaigns to drive targeted traffic and conversions",
      features: ["PPC Management", "ROI Tracking", "A/B Testing", "Analytics"],
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description:
        "Data-driven insights and analytics to inform your business decisions",
      features: [
        "Dashboard Creation",
        "KPI Tracking",
        "Predictive Analysis",
        "Reports",
      ],
    },
  ];

  // Event Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name.trim() ||
      !formData.number.trim() ||
      !formData.email.trim() ||
      !formData.service
    ) {
      toast.error("Please fill all the required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/api/contact`;
      const response = await axios.post(api, formData);

      toast.success("Thank you! We will contact you soon.");

      // Reset form
      setFormData({
        name: "",
        number: "",
        email: "",
        service: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      const errorMessage =
        error.response?.data?.msg || "Failed to submit form. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToServices = () => {
    document.getElementById("services").scrollIntoView({
      behavior: "smooth",
    });
  };

  // Render Methods
  const renderHeroSection = () => (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Transform Your Business With Digital Excellence</h1>
            <p>
              We provide cutting-edge solutions in web development, mobile apps,
              and digital marketing to drive your business growth and success in
              the digital world.
            </p>
            {/* // In your LandingPage.jsx - update the hero buttons section */}
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
              <button className="btn-secondary" onClick={scrollToServices}>
                Our Services
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Team Members</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-element element-1">
              <div className="element-icon">🌐</div>
              <span>Web Solutions</span>
            </div>
            <div className="floating-element element-2">
              <div className="element-icon">📱</div>
              <span>Mobile Apps</span>
            </div>
            <div className="floating-element element-3">
              <div className="element-icon">🎯</div>
              <span>Digital Marketing</span>
            </div>
            <div className="main-visual">
              <div className="visual-card">
                <h4>Your Digital Success Starts Here</h4>
                <p>Let's build something amazing together</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderFeaturesSection = () => (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
          <p className="section-subtitle">
            We deliver exceptional value through our comprehensive services and
            dedicated approach
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderServicesSection = () => (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p className="section-subtitle">
            Comprehensive solutions tailored to your business needs
          </p>
        </div>
        <div className="services-grid">
          {SERVICES_DATA.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-header">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
              </div>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                className="service-cta"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, service: service.title }));
                  scrollToContact();
                }}
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderContactSection = () => (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              Ready to start your project? Contact us today and let's discuss
              how we can help your business grow and achieve digital excellence.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <span>singhrishukumar008@gmail.com</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <span>+91 9341897481</span>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <span>
                    117 Chhattishgarh Colony
                    <br />
                    Bhopal , Mp
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3>Send us a Message</h3>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="number">Phone Number *</label>
                <input
                  id="number"
                  type="tel"
                  name="number"
                  placeholder="Enter your phone number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Interested In *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Service</option>
                  {SERVICES.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              <p className="form-note">
                * Required fields. We respect your privacy and will never share
                your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="landing-page">
      {renderHeroSection()}
      {renderFeaturesSection()}
      {renderServicesSection()}
      {renderContactSection()}
    </div>
  );
};

export default LandingPage;
