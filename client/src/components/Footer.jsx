import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/#services' },
        { name: 'About', path: '/#about' },
        { name: 'Contact', path: '/#contact' }
    ];

    const services = [
        'Web Development',
        'App Development',
        'Google Ads',
        'Data Analytics'
    ];

    const socialLinks = [
        { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
        { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
        { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' },
        { name: 'Instagram', icon: 'fab fa-instagram', url: '#' }
    ];

    const handleQuickLinkClick = (path) => {
        if (path.startsWith('/#')) {
            const sectionId = path.substring(2);
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(path);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Company Info */}
                    <div className="footer-section company-info">
                        <div className="footer-logo">
                            <div className="logo-icon">
                                <i className="fas fa-tasks"></i>
                            </div>
                            <div className="logo-text">
                                <h3>TaskFlow</h3>
                                <span>Management System</span>
                            </div>
                        </div>
                        <p className="company-description">
                            We provide cutting-edge digital solutions to help businesses 
                            grow and succeed in the modern digital landscape.
                        </p>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="social-link"
                                    aria-label={social.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <button 
                                        className="footer-link"
                                        onClick={() => handleQuickLinkClick(link.path)}
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-section">
                        <h4>Our Services</h4>
                        <ul className="footer-links">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <span className="footer-link">{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section contact-info">
                        <h4>Contact Us</h4>
                        <div className="contact-details">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>117 Chhattishgarh Colony<br /> Bhopal Mp</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <span>+91 9341897481</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>singhrishukumar008gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            <p>&copy; {currentYear} TaskFlow Management System. All rights reserved.</p>
                        </div>
                        <div className="footer-bottom-links">
                            <a href="/privacy">Privacy Policy</a>
                            <a href="/terms">Terms of Service</a>
                            <a href="/cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;