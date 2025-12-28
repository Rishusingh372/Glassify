// 

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navigationLinks = [
        { name: 'Home', path: '/', icon: 'fas fa-home' },
        { name: 'Services', path: '/#services', icon: 'fas fa-cogs' },
        { name: 'Contact', path: '/#contact', icon: 'fas fa-envelope' }
    ];

    const handleNavigation = (path) => {
        if (path.startsWith('/#')) {
            // Handle scroll to section
            const sectionId = path.substring(2);
            if (location.pathname === '/') {
                // If already on home page, just scroll
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // If not on home page, navigate to home then scroll
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else {
            navigate(path);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    // Don't show header on login page
    // if (location.pathname === '/login') {
    //     return null;
    // }

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo Section */}
                <div className="logo-section" onClick={handleLogoClick}>
                    <div className="logo-icon">
                        <i className="fas fa-tasks"></i>
                    </div>
                    <div className="logo-text">
                        <h1>TaskFlow</h1>
                        <span>Management System</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="header-nav">
                    {navigationLinks.map((link, index) => (
                        <button
                            key={index}
                            className="nav-link"
                            onClick={() => handleNavigation(link.path)}
                        >
                            <i className={link.icon}></i>
                            <span>{link.name}</span>
                        </button>
                    ))}
                </nav>

                {/* Login Button */}
                {location.pathname !== '/login' && (
                    <div className="header-actions">
                        <button 
                            className="login-btn"
                            onClick={handleLoginClick}
                        >
                            <i className="fas fa-sign-in-alt"></i>
                            <span>Login</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;