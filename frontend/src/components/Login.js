import { useState, useContext } from "react";
import { login as loginApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginApi(userData);
            const { token, role } = res.data;

            login(token, role);
            setMessage("Login successful!");
            navigate("/");
        } catch (error) {
            setMessage("Error: " + (error.response?.data?.message || "Something went wrong"));
        }
    };

    return (
        <div class="login-container">
        <div className="login-page">
            <div className="info-section">
                <h1>Welcome to <span>BloodLink</span></h1>
                <p>Connecting lifesavers with those in need, every drop counts.</p>
                <ul>
                    <li>✅ Fast and secure login</li>
                    <li>✅ Access donor and receiver info</li>
                    <li>✅ Real-time donation updates</li>
                </ul>
                <div className="animated-bg" />
            </div>

            <div className="form-section">
                <div className="login-box">
                    <h2>Login to Continue</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            required
                        />
                        <button type="submit">Login</button>
                        {message && <p className="message">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
         </div>
    );
};

export default Login;
