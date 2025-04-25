import { useEffect, useState } from "react";
import { getUserProfile, getDonationHistory, getAllDonations, addDonation } from "../services/api";
import CertificateGenerator from "./CertificateGenerator"; // Import the certificate component
import "./UserProfile.css";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [donations, setDonations] = useState([]);
    const [newDonation, setNewDonation] = useState({ recipientName: "", hospital: "", unitsDonated: "" });
    const [eligibilityMessage, setEligibilityMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getUserProfile();
                setUser(res.data);

                if (res.data.role === "admin") {
                    const allDonationsRes = await getAllDonations();
                    setDonations(allDonationsRes.data.donations || []);
                } else {
                    const userDonationsRes = await getDonationHistory();
                    setDonations(userDonationsRes.data.donations || []);
                }
            } catch (error) {
                console.error("Error fetching user profile", error);
            }
        };
        fetchProfile();
    }, []);

    const handleDonationSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addDonation(newDonation);
            if (res.data && res.data.donation) {
                setDonations((prevDonations) => [...prevDonations, res.data.donation]);
                setNewDonation({ recipientName: "", hospital: "", unitsDonated: "" }); // Reset form
            }
        } catch (error) {
            console.error("Error adding donation:", error);
        }
    };

    const [formData, setFormData] = useState({
        age: "",
        weight: "",
        isHealthy: true,
    });


    // Donor eligibility check function
    const checkEligibility = () => {
        const { age, weight, isHealthy } = formData;

        // Validate the eligibility criteria
        if (age >= 18 && age <= 65 && weight >= 50 && weight < 110 && isHealthy) {
            setEligibilityMessage("✅ You are eligible to donate blood!");
        } else {
            setEligibilityMessage("❌ Sorry, you are not eligible to donate blood.");
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    return (
        <div className="profile-container">
            <h2 className="profile-title" style={{ fontWeight: "bold" }}>PROFILE</h2>

            {user ? (
                <div className="profile-grid">
                    <div className="profile-box">
                        <h3>User Profile</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Blood Type:</strong> {user.bloodType}</p>
                        <p><strong>Location:</strong> {user.location}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <br /><br />
                        {user.role === "donor" && (
                            <>
                                <h3>Add New Donation</h3>
                                <form onSubmit={handleDonationSubmit} className="donation-form">
                                    <input
                                        type="text"
                                        placeholder="Recipient Name"
                                        value={newDonation.recipientName}
                                        onChange={(e) => setNewDonation({ ...newDonation, recipientName: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Hospital Name"
                                        value={newDonation.hospital}
                                        onChange={(e) => setNewDonation({ ...newDonation, hospital: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Units Donated"
                                        value={newDonation.unitsDonated}
                                        onChange={(e) => setNewDonation({ ...newDonation, unitsDonated: e.target.value })}
                                        required
                                    />
                                    <button type="submit" className="submit-button">Add Donation</button>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="profile-box">
                        <h3>Donation History</h3>
                        {donations.length > 0 ? (
                            <div className="donation-history">
                                {donations.map((donation, index) => (
                                    <div key={index} className="donation-item">
                                        <p><strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}</p>
                                        <p><strong>Recipient:</strong> {donation.recipientName}</p>
                                        <p><strong>Hospital:</strong> {donation.hospital}</p>
                                        <p><strong>Units Donated:</strong> {donation.unitsDonated || "N/A"}</p>
                                        <CertificateGenerator
                                            donorName={user.name}
                                            donationDate={new Date(donation.date).toLocaleDateString()}
                                            bloodType={user.bloodType}
                                            unitsDonated={donation.unitsDonated || "N/A"}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No donations recorded yet.</p>
                        )}
                    </div>

                    <div className="profile-container">
            <h2 className="profile-title" style={{ fontWeight: "bold" }}>Donor Eligibility Check</h2>

            <div className="profile-box">
                <h3>Eligibility Form</h3>
                <form onSubmit={(e) => e.preventDefault()} className="eligibility-form">
                    <input
                        type="number"
                        placeholder="Age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Weight (kg)"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                    <div>
    <label style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
        <input
            type="checkbox"
            name="isHealthy"
            checked={formData.isHealthy}
            onChange={handleChange}
            style={{ marginRight: "8px" }}
        />
        I am in good health
    </label>
</div>





                    <button onClick={checkEligibility} type="submit" className="submit-button">
                        Check Eligibility
                    </button>
                </form>

                {eligibilityMessage && (
                    <div
                        className={`eligibility-result ${eligibilityMessage.includes("❌") ? "alert-danger" : "alert-success"}`}
                    >
                        {eligibilityMessage}
                    </div>
                )}
            </div>
        </div>
                </div>
            ) : (
                <p className="loading-text">Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
