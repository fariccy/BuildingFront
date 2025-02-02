import React, { useState } from 'react';
import Footer from "../dash/Footer";
import Header from "../dash/Header";
import Nav from "../dash/Nav";
import axios from 'axios';

const AddBuilding = () => {
    // Use a string key to retrieve the customer ID from localStorage
    const [custId, setCustId] = useState(parseInt(localStorage.getItem('custId')) || 0); // Default to 0 if not found

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const location = event.target.location.value;
        const imageFile = event.target.image.files[0]; // Get the file from the input
        const description = event.target.description.value;
        const customerId = event.target.customerId.value; // Assuming you have a customer ID input

        // Create a FormData object to send the data
        const formData = new FormData();
        formData.append('location', location);
        formData.append('image', imageFile); // Append the image file
        formData.append('description', description);
        formData.append('customerId', customerId); // Append customer ID

        try {
            // Send a POST request to the API
            const response = await axios.post('http://localhost:8080/api/building/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
                }
            });
            console.log('Building added:', response.data);
            alert('Building added successfully!');
            // Optionally, reset the form
            event.target.reset();
        } catch (error) {
            // Improved error handling
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || error.response.data}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('No response from server. Please try again later.');
            } else {
                console.error('Error message:', error.message);
                alert('Error adding building. Please try again.');
            }
        }
    };

    return (
        <>
            <div className="dashboards">
                <Header />
                <div className="containers">
                    <Nav />
                    <main className="contents">
                        <div className="cont">
                            <h1>Add Building</h1>
                            <form id="buildingForm" onSubmit={handleSubmit}>
                                <label htmlFor="location">Location:</label>
                                <input type="text" id="location" name="location" required />

                                <label htmlFor="image">Image:</label>
                                <input type="file" id="image" name="image" accept="image/*" required /> {/* Change to file input */}

                                <label htmlFor="description">Description:</label>
                                <textarea id="description" name="description" required></textarea>

                                {/* <label htmlFor="customerId">Customer ID:</label> */}
                                <input type="number" id="customerId" hidden value={custId} name="customerId" required />

                                <button type="submit">Add Building</button>
                            </form>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default AddBuilding;