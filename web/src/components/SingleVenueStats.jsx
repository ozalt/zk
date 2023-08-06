import {React, useState} from 'react';

const SingleVenueStats = ({ mechanic }) => {
    const { provider, contact } = mechanic;
    const [showDetails, setShowDetails] = useState(false); // State to track whether details are shown

    const toggleDetails = () => {
      setShowDetails(!showDetails);
    };
  

    return (
            <div className="single-ad-box">
                <div className="details">
                    <h3>{provider}</h3>
                    <p>{contact}</p>
                </div>
                <div className="actions">
                    <button className="approve" onClick={toggleDetails}>
                        See Detail
                    </button>
                </div>
                {showDetails && (
        <div className="details-table">
          <h3>Vendor Engagment Scores</h3>
          <table>
            {/* Table header */}
            <thead>
              <tr>
                <th>Total Venues</th>
                <th>Total Menus</th>
                <th>No. of Packages</th>
                <th>Inquiries Recieved</th>
                <th>Average Reviews</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Replace with your actual data */}
              <tr>
                <td>4</td>
                <td>3</td>
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

export default SingleVenueStats;
