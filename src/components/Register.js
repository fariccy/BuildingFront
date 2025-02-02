import React, { useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username,
            password,
            role: "Customer", // Assuming role is always "Customer"
            address,
        };

        try {
            const response = await fetch("http://localhost:8080/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // Handle successful registration (e.g., redirect to login page)
                alert("Registration successful!");
               history("/"); // Redirect to login page
            } else {
                // Handle errors (e.g., show error message)
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="login">
            <div className="container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;