// src/App.js
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/customer/Dashboard';
import ManageBuilding from './components/customer/ManageBuilding';
import ViewFeedback from './components/customer/ViewFeedback';
import AddBuilding from './components/customer/AddBuilding';
import Dashboards from './components/constructor/Dashboards';
import Feedback from './components/constructor/Feedback';
import ViewBuilding from './components/constructor/ViewBuilding';
import AddComment from './components/constructor/AddComment';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const userId = localStorage.getItem("custId") || localStorage.getItem("constId");
        if (userId) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='/reg' element={<Register />} />
            <Route path='/manage-build' element={isAuthenticated ? <ManageBuilding /> : <Navigate to="/" />} />
            <Route path='/dash' element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path='/view-feedback' element={isAuthenticated ? <ViewFeedback /> : <Navigate to="/" />} />
            <Route path='/addbuilding' element={isAuthenticated ? <AddBuilding /> : <Navigate to="/" />} />
            <Route path='/dashbords' element={isAuthenticated ? <Dashboards /> : <Navigate to="/" />} />
            <Route path='/feedback' element={isAuthenticated ? <Feedback /> : <Navigate to="/" />} />
            <Route path='/view-buildings' element={isAuthenticated ? <ViewBuilding /> : <Navigate to="/" />} />
            <Route path='/add-comment/:id' element={isAuthenticated ? <AddComment /> : <Navigate to="/" />} />
        </Routes>
    );
}

export default App;