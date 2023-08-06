import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

const UserDetail = () => {
    const adminName = 'Your Admin Name';
    const { id } = useParams();
    const [ad, setAd] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchAdData = () => {
            setTimeout(() => {
            fetch(`http://localhost:8000/rr/users/${id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setAd(data); // Update the ad state with fetched data
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setError('An error occurred while fetching data.');
                    setLoading(false);
                });
            }, 750);

        };
        fetchAdData();
    }, [id]);

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
                        <span>Dashboard</span> / <span>Admin</span>
                    </div>
                    <h2>Ad Details</h2>
                    <div className='ads' id='single-ads'>
                        <div className="ad-detail">
                            <div className="details">
                                <h3>Name: {ad.name}</h3>
                                <p>Email: {ad.email}</p>
                                <p>Contact: {ad.contact}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
