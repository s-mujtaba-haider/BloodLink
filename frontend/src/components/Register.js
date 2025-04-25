import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Import the CSS file

const Register = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: "donor",  // Default role
        bloodType: "A+", // Default blood type
        location: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(userData);
            setMessage("Registration successful!");
            navigate("/login"); // Redirect to login after registration
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                {/* Left Section */}
                <div className="info-section">
                    <h1>Join <span>BloodLink</span></h1>
                    <p>Become a lifesaver. Your registration will help us connect donors and recipients instantly.</p>
                    <ul>
                        <li>✅ Fast registration</li>
                        <li>✅ Choose your role (Donor/Recipient)</li>
                        <li>✅ Secure and verified platform</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="form-section">
                    <div className="register-form">
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                value={userData.name} 
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })} 
                                required 
                            />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={userData.email} 
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
                                required 
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={userData.password} 
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
                                required 
                            />
                            <select 
                                value={userData.role} 
                                onChange={(e) => setUserData({ ...userData, role: e.target.value })} 
                                className="select-box"
                                required
                            >
                                <option value="donor">Donor</option>
                                <option value="recipient">Recipient</option>
                            </select>
                            <select 
                                value={userData.bloodType} 
                                onChange={(e) => setUserData({ ...userData, bloodType: e.target.value })} 
                                className="select-box"
                                required
                            >
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                            <input 
                                type="text" 
                                placeholder="Location" 
                                value={userData.location} 
                                onChange={(e) => setUserData({ ...userData, location: e.target.value })} 
                                required 
                            />
                            <button type="submit">Register</button>
                        </form>
                        {message && <p className="message" style={{color : "red"}}>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
