import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nev = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('constId'); 
        localStorage.removeItem('custtId'); // Adjust this based on your storage keys
        // You can also clear other user-related data if necessary
        // localStorage.removeItem('userToken'); // Example for a token

        // Redirect to the login page or home page
        navigate("/"); // Change this to your actual login route
    };

    return (
        <nav className="sidebars">
            <ul>
                <li><Link to="/dashbords">Home</Link></li>
                <li><Link to={'/feedback'}>Feedback</Link></li>
                <li><Link to={'/view-buildings'}>View Building</Link></li>
                <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </ul>
        </nav>
    );
}

export default Nev;