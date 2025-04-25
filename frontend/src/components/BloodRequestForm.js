import { useState } from "react";
import { createRequest } from "../services/api";
import "./BloodRequestForm.css";

const BloodRequestForm = () => {
    const [formData, setFormData] = useState({
        bloodType: "",
        unitsRequired: "",
        hospital: "",
        location: "",
        contactNumber: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRequest(formData);
            setMessage("✅ Your blood request has been submitted. We'll connect you shortly.");
            setFormData({
                bloodType: "",
                unitsRequired: "",
                hospital: "",
                location: "",
                contactNumber: ""
            });
        } catch (error) {
            setMessage("❌ " + (error.response?.data?.message || "Something went wrong. Please try again."));
        }
    };

    return (
        <div className="form-wrapper">
            <div className="info-column">
                <h2>🩸 Need Blood Urgently?</h2>
                <p>Fill in the request form and we’ll help you find donors quickly and efficiently.</p>
                <ul>
                    <li>📍 Find local donors</li>
                    <li>📞 Get contacted fast</li>
                    <li>🤝 Save lives with one click</li>
                </ul>
                <p className="note">* Your information is kept confidential.</p>
            </div>

            <div className="form-column">
                <div className="form-container">
                    <h3 className="form-title">Blood Request Form</h3>
                    <form className="blood-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Blood Type</label>
                            <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
                                <option value="">Select Blood Group</option>
                                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Units Needed</label>
                            <input type="number" name="unitsRequired" value={formData.unitsRequired} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Hospital Name</label>
                            <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                        </div>

                        <button className="submit-btn" type="submit">🚑 Submit Request</button>
                    </form>

                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default BloodRequestForm;
