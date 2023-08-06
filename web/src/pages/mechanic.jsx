import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import SingleVenueStats from '../components/SingleVenueStats';

const Mechanic = () => {
    const adminName = 'Your Admin Name'; // Replace with your actual admin name
    const [mechanic, setMechanic] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchuserData();
    }, []);

    const fetchuserData = () => {
        // Fetch data from http://localhost:8000/rr/users/
        setTimeout(() => {
            // Fetch data from http://localhost:8000/rr/users/
            fetch('http://localhost:8000/rr/services/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setMechanic(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setError('An error occurred while fetching data.');
                    setLoading(false);
                });
        }, 750);
    };

    if (loading) {
        return <div class="animation">Rapid Repair</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <TopNavbar adminName={adminName} />
                <div className="content-body">
                    {/* Breadcrumb */}
                    <div className="breadcrumb">
                        <span>Dashboard</span> / <span>User</span>
                    </div>
                    <h2>Mechanic Detail</h2>
                    <div className='ads'>
                        {mechanic.map((ad) => (
                            <SingleVenueStats key={ad._id} mechanic={ad} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mechanic;
