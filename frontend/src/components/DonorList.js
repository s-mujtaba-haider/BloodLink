import { useEffect, useState } from "react";
import { getDonors, getUserProfile } from "../services/api";
import "./DonorList.css";

const DonorList = () => {
    const [donors, setDonors] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await getUserProfile(token);
                setUserRole(userRes.data.role);

                if (userRes.data.role === "admin" || userRes.data.role === "recipient") {
                    const res = await getDonors(token);
                    setDonors(res.data);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, [token]);

    if (userRole !== "admin" && userRole !== "recipient") {
        return <p className="error-message">Access Denied. Only recipients and admins can view this.</p>;
    }

    return (
        <div className="donor-page">
            <div className="left-panel">
                <h1>Meet Our Heroes</h1>
                <p>
                    Every drop counts! Our donors are lifesavers, standing by to help when it matters most.
                    Explore the list of donors and feel the impact of kindness in action.
                </p>
                <img src="https://conceptstadium.com/wp-content/uploads/2018/11/Shireburn-Blood-Drive-2018-1.jpg" alt="blood donation" />
            </div>

            <div className="right-panel">
                <h2 className="title">Donor List</h2>
                {donors.length > 0 ? (
                    <ul className="donor-list">
                        {donors.map((donor) => (
                            <li key={donor.id} className="donor-card">
                                <div className="donor-icon">🩸</div>
                                <div>
                                    <strong>{donor.name}</strong>
                                    <p>Blood Type: <span>{donor.bloodType}</span></p>
                                    <p>Location: <span>{donor.location}</span></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-donors">No donors available</p>
                )}
            </div>
        </div>
    );
};

export default DonorList;
