import { useEffect, useState } from "react";
import { getRequests, deleteRequest } from "../services/api";
import "./BloodRequestList.css"; // Import CSS

const BloodRequestList = () => {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await getRequests(token);
                setRequests(res.data);
            } catch (error) {
                console.error("Error fetching requests", error);
            }
        };
        fetchRequests();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await deleteRequest(id, token);
            setRequests(requests.filter((req) => req.id !== id));
        } catch (error) {
            console.error("Error deleting request", error);
        }
    };

    return (
        <div className="blood-request-wrapper">
            <div className="info-column">
                <h2>🩸 Blood Requests</h2>
                <p>Here is a list of all urgent blood requests that need immediate attention.</p>
                <ul>
                    <li>📍 Find local blood requests</li>
                    <li>📝 Quick access to request details</li>
                </ul>
                <p className="note">* Requests are shown for informational purposes only.</p>
            </div>

            <div className="request-column">
                <div className="request-container">
                    <h3 className="request-title">Urgent Blood Requests</h3>
                    <ul className="blood-request-list">
                        {requests.map((req) => (
                            <li key={req.id} className="blood-request-item">
                                <div className="request-info">
                                    <span className="blood-request-text">
                                        {req.bloodType} needed at {req.location}
                                    </span>
                                     
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BloodRequestList;
