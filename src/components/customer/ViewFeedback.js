import { useEffect, useState } from "react";
import Footer from "../dash/Footer";
import Header from "../dash/Header";
import Nev from "../dash/Nev";
import axios from "axios";
import Nav from "../dash/Nav";

const ViewFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [buildings, setBuildings] = useState([]);
    const [newFeedback, setNewFeedback] = useState({ comments: '', buildingId: '' });
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [constructorId, setConstructorId] = useState(parseInt(localStorage.getItem('custId')) || 0); // Set this to the desired constructor ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const feedbackResponse = await axios.get('http://localhost:8080/api/feedback/all');
                const buildingResponse = await axios.get('http://localhost:8080/api/building/all');
                
                // Filter feedbacks based on constructorId
                const filteredFeedbacks = feedbackResponse.data.filter(feedback => feedback.building.customer.id === constructorId);
                
                setFeedbacks(filteredFeedbacks);
                setBuildings(buildingResponse.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [constructorId]); // Add constructorId to the dependency array if it can change

    const handleAddFeedback = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/feedbacks/add-feedback', newFeedback);
            setFeedbacks([...feedbacks, response.data]);
            setNewFeedback({ comments: '', buildingId: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateFeedback = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/feedbacks/${editingFeedback.id}`, newFeedback);
            setFeedbacks(feedbacks.map(feedback => (feedback.id === editingFeedback.id ? response.data : feedback)));
            setNewFeedback({ comments: '', buildingId: '' });
            setEditingFeedback(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteFeedback = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/feedback/delete/${id}`);
                setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEditFeedback = (feedback) => {
        setNewFeedback({ comments: feedback.comments, buildingId: feedback.building.id });
        setEditingFeedback(feedback);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboards">
            <Header />
            <div className="containers">
                <Nav />
                <main className="contents">
                    <div className="cont">
                        <h1>Feedback Management</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Comments</th>
                                    <th>Building ID</th>
                                    <th>Constructor Name</th>
                                    <td>Expertise</td>
                                    {/* <th>Edit</th>
                                    <th>Delete</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((feedback, index) => (
                                    <tr key={feedback.id}>
                                        <td>{index + 1}</td>
                                        <td>{feedback.comments}</td>
                                        <td>{feedback.building.id}</td>
                                        <td>{feedback.constructor.username}</td>
                                        <td>{feedback.constructor.expertise}</td>

                                        {/* <td>
                                            <button className="edity-button" onClick={() => handleEditFeedback(feedback)}>Edit</button>
                                        </td>
                                        <td>
                                            <button className="delete-button" onClick={() => handleDeleteFeedback(feedback.id)}>Delete</button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ViewFeedback;