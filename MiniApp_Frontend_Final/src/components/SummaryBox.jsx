import { group } from 'd3';
import React, { useState, useEffect } from 'react';

const SummaryPage = ({ group_name }) => {
  const [data, setData] = useState(null);

  // Fetch data from Backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/homesummary?group_name=${group_name}`, {
        method: "GET",
        // headers: {
        //   "ngrok-skip-browser-warning": "true"
        // }
      });

      // Parse the JSON response
      const result = await response.json();
      //setData(hardcodeddData)
      setData(result.Summary);
      console.log("Data successfully fetched from the backend:");
      console.log(result); // Log the result for debugging
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // Call fetchData when component mounts (for future use)
  useEffect(() => {
    fetchData();
  }, [group_name]);

  return (
    <div className="summary-page-container">
      <div className="summary-box">
        {/* Display fetched data when available */}
        {group_name ? (
          <>
            <h2 className="summary-title">{group_name} Summary</h2>
            <p className="summary-description">{data}</p>
          </>
        ) : (
          <p className="summary-description">
            This is the description of the summary. You can include more information here, such as key points, highlights, or important details.
          </p>
        )}
      </div>

      <style jsx>{`
        /* General styles for the Summary Page */
        .summary-page-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          font-family: Arial, sans-serif;
          color: #fff;
        }

        .summary-header {
          font-size: 2rem;
          margin-bottom: 20px;
          text-align: center;
        }

        /* Style for the summary box */
        .summary-box {
          background-color: linear-gradient(to right, #ff7e5f, #feb47b); 
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 10px;
          width: 80%;
          max-width: 900px;
          border-radius: 8px;
          margin-top: 30px;
        }

        .summary-title {
          font-size: 1.8rem;
          margin-bottom: 15px;
          color: white;
        }

        .summary-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #fff;
        }

        /* Responsive design for mobile screens */
        @media (max-width: 768px) {
          .summary-header {
            font-size: 1.5rem;
          }

          .summary-box {
            width: 90%;
            padding: 15px;
          }

          .summary-title {
            font-size: 1.5rem;
          }

          .summary-description {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SummaryPage;
