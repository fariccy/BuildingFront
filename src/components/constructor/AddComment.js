import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../dash/Footer";
import Nav from "../dash/Nav";
import Nev from "../dash/Nev";
import Header from "../dash/Header";

const AddComment = () => {
  const { id: buildingId } = useParams(); // Get building ID from URL
  const [constructorId, setConstructorId] = useState(parseInt(localStorage.getItem('constId')) || 0); // Get constructor ID from localStorage

  const [commentData, setCommentData] = useState({
    comments: "",
    building: { id: parseInt(buildingId) }, // Use buildingId from URL
    constructor: { id: constructorId }, // Use the constructor ID directly
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCommentData({ ...commentData, comments: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the commentData to see what is being sent
      console.log("Submitting comment data:", commentData);
      
      const response = await axios.post("http://localhost:8080/api/feedback/add", commentData);
      alert("Comment added successfully.");
      navigate("/feedback"); // Redirect to the view buildings page
    } catch (err) {
      // Log the error response for debugging
      console.error(err.response ? err.response.data : err.message);
      alert("Error adding comment: " + (err.response ? err.response.data : err.message));
    }
  };

  return (
    <div className="dashboards">
      <Header />
      <div className="containers">
        <Nev />
        <main className="contents" style={{marginTop:"50px"}}>
          <div>
            <h2>Add Comment for Building </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={commentData.comments}
                onChange={handleChange}
                placeholder="Enter your comment"
                required
              />
              <button type="submit">Submit Comment</button>
              {/* <button type="button" onClick={() => navigate("/f")}>
                Cancel
              </button> */}
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AddComment;