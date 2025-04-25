import { useState } from "react";
import { sendNotificationEmail } from "../services/api";
import "./Notification.css"; // Import the CSS file

const Notification = () => {
    const [emailData, setEmailData] = useState({
        email: "",
        subject: "",
        message: "",
    });

    const [response, setResponse] = useState("");
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendNotificationEmail(emailData, token);
            setResponse("✅ Notification sent successfully!");
            setEmailData({ email: "", subject: "", message: "" }); // Clear form
        } catch (error) {
            console.error("Error sending notification:", error.response?.data || error.message);
            setResponse("❌ Error sending notification.");
        }
    };

    return (
        <div className="form-wrapper">
            <div className="info-column">
                <h2>📧 Send a Notification</h2>
                <p>Fill in the details to send an email notification. Stay connected with your users effortlessly.</p>
                <ul>
                    <li>✉️ Notify recipients instantly</li>
                    <li>📋 Customize the subject and message</li>
                    <li>🔒 Secure and confidential communication</li>
                </ul>
                <p className="note">* Your information will remain confidential.</p>
            </div>

            <div className="form-column">
                <div className="form-container">
                    <h3 className="form-title">Notification Form</h3>
                    <form className="notification-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Recipient Email</label>
                            <input
                                type="email"
                                placeholder="Recipient Email"
                                value={emailData.email}
                                onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                placeholder="Subject"
                                value={emailData.subject}
                                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                placeholder="Message"
                                value={emailData.message}
                                onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                                required
                            />
                        </div>

                        <button className="submit-btn" type="submit">Send Notification</button>
                    </form>

                    {response && <p className="response-message">{response}</p>}
                </div>
            </div>
        </div>
    );
};

export default Notification;
