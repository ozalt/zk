import React, { useState } from 'react';


const SingleAdBox = ({ user }) => {
  const { name, email } = user;
  const [showDetails, setShowDetails] = useState(false); // State to track whether details are shown

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="single-ad-box">
      <div className="details">
        <h3>{name}</h3>
        <p>{email}</p>
      </div>
      <div className="actions">
        <button className="approve" onClick={toggleDetails}>
          See Detail
        </button>
      </div>
      {/* Conditional rendering of the details */}
      {showDetails && (
        <div className="details-table">
          <h3>User Interactivity Scores</h3>
          <table>
            {/* Table header */}
            <thead>
              <tr>
                <th>Inquiry Request</th>
                <th>Sign Up Date</th>
                <th>Reviews Given</th>
                <th>Total Searches</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Replace with your actual data */}
              <tr>
                <td>4</td>
                <td>4/8/2023</td>
                <td>2</td>
                <td>19</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
          {/* Close button */}
          <button className="close-btn" onClick={toggleDetails}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleAdBox;
