import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import SingleAdBox from '../components/SingleAdBox';

const User = () => {
    const adminName = 'Your Admin Name'; // Replace with your actual admin name
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAdsData();
    }, []);

    const fetchAdsData = () => {
        // Simulate loading delay for demo purposes (remove this in production)
        setTimeout(() => {
            // Fetch data from http://localhost:8000/rr/users/
            fetch('http://localhost:8000/rr/users/')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setAds(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setError('An error occurred while fetching data.');
                    setLoading(false);
                });
        }, 750); // Simulated 2-second delay (adjust as needed)
    };

    if (loading) {
        return (
            <div class="animation">Rapid Repair!</div>
        );
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
                    <h2>Login User Detail</h2>
                    <div className='ads'>
                        {ads.map((ad) => (
                            <SingleAdBox key={ad.id} user={ad} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
