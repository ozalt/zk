import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const adminName = 'Your Admin Name'; // Replace with your actual admin name
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfMechanics, setNumberOfMechanics] = useState(0);

    useEffect(() => {
        fetchUserData();
        fetchMechanicData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8000/rr/users/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNumberOfUsers(data.length);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchMechanicData = async () => {
        try {
            const response = await fetch('http://localhost:8000/rr/services/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNumberOfMechanics(data.length);
        } catch (error) {
            console.error('Error fetching mechanic data:', error);
        }
    };

    // Calculate the percentage for the progress bars
    const userProgress = (numberOfUsers / 100) * 100;
    const mechanicProgress = (numberOfMechanics / 100) * 100;

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <TopNavbar adminName={adminName} />
                <div className="content-body">
                    {/* Breadcrumb */}
                    <div className="breadcrumb">
                        <span>Dashboard</span> / <span>Admin</span>
                    </div>

                    {/* 2 Stylish Boxes in a Row */}
                    <div className="box-container">
                        <div className="box user-box">
                            <h2>Login User</h2>
                            {/* Progress Bar */}
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${userProgress}%` }}>
                                    <span className="progress-number">{numberOfUsers}</span>
                                </div>
                            </div>
                            <Link to={"user-detail"}>
                                <button>View</button>
                            </Link>
                        </div>
                        <div className="box mechanic-box">
                            <h2>Mechanic</h2>
                            {/* Progress Bar */}
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${mechanicProgress}%` }}>
                                    <span className="progress-number">{numberOfMechanics}</span>
                                </div>
                            </div>
                            <Link to={"mechanic-detail"}>
                                <button>View</button>
                            </Link>
                        </div>
                    </div>

                    {/* Big Box with Admin Details */}
                    <div className="big-box">
                        <h2>Admin Details</h2>
                        <p>Name: {adminName}</p>
                        {/* Add other admin details here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
