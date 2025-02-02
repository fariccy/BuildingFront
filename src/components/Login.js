import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await axios.get(`http://localhost:8080/api/user/username/${username}`);
            const user = response.data;

            // Check if the password matches
            if (user.password === password) {
                // Handle successful login (e.g., store user info, redirect)
                // console.log('Login successful:', user);
                // navigate('/dash'); // Redirect to dashboard
                if(user.role === "Customer"){
                    navigate('/dash');
                    alert("Welcome Customer");
                    localStorage.setItem("custId", user.id)
                }

                if(user.role === "Constructor"){
                    navigate('/dashbords')
                    alert("Welcome Constructor");
                    localStorage.setItem("constId", user.id)

                }
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('User  not found');
            console.error(err);
        }
    };

    return (
        <div className="login">
            <div className="container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
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
                    <button type="submit">Login</button>
                    <Link to='/reg'>Register now</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;