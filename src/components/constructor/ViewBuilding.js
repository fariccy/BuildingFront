
import { useEffect, useState } from "react";
import Footer from "../dash/Footer";
import Header from "../dash/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import Nev from "../dash/Nev";

const ViewBuilding = () => {
  const [buildingInfo, setBuildingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null); // State for enlarged image

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://building-solution-app-fdd7139e9f3e.herokuapp.com/api/building/all");
        setBuildingInfo(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (image) => {
    setEnlargedImage(`data:image/png;base64,${image}`); // Set the enlarged image
  };

  const closeImage = () => {
    setEnlargedImage(null); // Close the enlarged image
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboards">
      <Header />
      <div className="containers">
        <Nev />
        <main className="contents">
          <div className="cont">
            <h1 className="desc">Data Table</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Location</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {buildingInfo.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.location}</td>
                    <td>
                      <img
                        src={`data:image/png;base64,${item.image}`}
                        alt={`Image of ${item.city}`}
                        style={{ width: "90px", height: "50px", cursor: 'pointer' }}
                        onClick={() => handleImageClick(item.image)} // Handle image click
                      />
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <Link to={`/add-comment/${item.id}`}>
                        <button className="edit-button">Add Comment</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {enlargedImage && ( // Conditionally render the enlarged image
            <div className="enlarged-image-container">
              <button className="close-button" onClick={closeImage}>Close</button>
              <img src={enlargedImage} alt="Enlarged view" style={{ maxWidth: '90%', maxHeight: '90%' }} />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ViewBuilding;