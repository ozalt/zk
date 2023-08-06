import React from 'react';

const TopNavbar = ({ adminName }) => {
    return (
        <div className="top-navbar">
            <span>{adminName}</span>
        </div>
    );
};

export default TopNavbar;
