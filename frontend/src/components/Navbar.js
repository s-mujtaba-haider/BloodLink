import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isAdmin, userRole, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
        setMenuOpen(false); // close menu after logout
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header id="header" className="header sticky-top">
            {/* Topbar Section */}
            <div className="topbar d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope d-flex align-items-center">
                            <a href="mailto:contact@example.com">bloodlink-fast@lhr.nu.edu.pk</a>
                        </i>
                        <i className="bi bi-phone d-flex align-items-center ms-4">
                        <a href="tel:0300 1234 567">+92 300 1234 567</a>
                        </i>
                    </div>
                    <div className="social-links d-none d-md-flex align-items-center">
                        <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </div>

            {/* Branding Section */}
            <div className="branding d-flex align-items-center">
                <div className="container position-relative d-flex align-items-center justify-between">
                    <Link to="/" className="logo d-flex align-items-center me-auto">
                        <h1 className="sitename">BloodLink</h1>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="desktop-navmenu d-none d-md-flex">
                        <ul>
                            {!isLoggedIn && (
                                <>
                                    <li><a href="#home">Home</a></li>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#services">Services</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/register">Register</Link></li>
                                </>
                            )}
                            {isLoggedIn && isAdmin && (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/aboutus">About Us</Link></li>
                                    <li><Link to="/dashboard">Admin Dashboard</Link></li>
                                    <li><Link to="/donors">Donor</Link></li>
                                    <li><Link to="/blood-request">Request Blood</Link></li>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/notifications">Notifications</Link></li>
                                    <li><Link to="/requests">Requests</Link></li>
                                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                                </>
                            )}
                            {isLoggedIn && !isAdmin && userRole === "donor" && (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/aboutus">About Us</Link></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link to="/requests">Requests</Link></li>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                                </>
                            )}
                            {isLoggedIn && !isAdmin && userRole === "recipient" && (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/aboutus">About Us</Link></li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><Link to="/donors">Donors</Link></li>
                                    <li><Link to="/blood-request" className="request-blood-btn">Request Blood</Link></li>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                                </>
                            )}
                        </ul>
                    </nav>

                    {/* Mobile Toggle */}
                    <i
                        className="mobile-nav-toggle d-md-none bi bi-list"
                        onClick={toggleMenu}
                        style={{ fontSize: "28px", cursor: "pointer", color: "#000" }}
                    ></i>

                    {/* Mobile Menu */}
                    <nav className={`mobile-navmenu d-md-none ${menuOpen ? "open" : ""}`}>
                        <ul>
                            {!isLoggedIn && (
                                <>
                                    <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                                    <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
                                </>
                            )}
                            {isLoggedIn && isAdmin && (
                                <>
                                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                                    <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
                                    <li><Link to="/dashboard" onClick={closeMenu}>Admin Dashboard</Link></li>
                                    <li><Link to="/donors" onClick={closeMenu}>Donor</Link></li>
                                    <li><Link to="/blood-request" onClick={closeMenu}>Request Blood</Link></li>
                                    <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                                    <li><Link to="/notifications" onClick={closeMenu}>Notifications</Link></li>
                                    <li><Link to="/requests" onClick={closeMenu}>Requests</Link></li>
                                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                                </>
                            )}
                            {isLoggedIn && !isAdmin && userRole === "donor" && (
                                <>
                                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                                    <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
                                    <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                                    <li><Link to="/requests" onClick={closeMenu}>Requests</Link></li>
                                    <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                                </>
                            )}
                            {isLoggedIn && !isAdmin && userRole === "recipient" && (
                                <>
                                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                                    <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
                                    <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                                    <li><Link to="/donors" onClick={closeMenu}>Donors</Link></li>
                                    <li><Link to="/blood-request" onClick={closeMenu} className="request-blood-btn">Request Blood</Link></li>
                                    <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                                    <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Mobile Styles */}
            <style>{`
                .mobile-navmenu {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.95);
                    transform: translateX(100%);
                    transition: transform 0.3s ease-in-out;
                    z-index: 999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-navmenu.open {
                    transform: translateX(0);
                }

                .mobile-navmenu ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    text-align: center;
                }

                .mobile-navmenu ul li {
                    margin: 20px 0;
                }

                .mobile-navmenu ul li a,
                .mobile-navmenu ul li button {
                    color: #fff;
                    font-size: 1.5rem;
                    text-decoration: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .mobile-nav-toggle {
                    font-size: 30px;
                    color: #000;
                }

                .logout-button {
                    color: #fff;
                    font-size: 1.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                }
            `}</style>
        </header>
    );
};

export default Navbar;
