import { useEffect, useState } from "react";
import Footer from "../dash/Footer";
import Header from "../dash/Header";
import Nav from "../dash/Nav";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageBuilding = () => {
  const [buildingInfo, setBuildingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

      const [custId, setCustId] = useState(parseInt(localStorage.getItem('custId')) || 0); // Default to 0 if not found
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/building/all"
        );
        // Filter buildings based on customer id
        const filteredBuildings = response.data.filter(item => item.customer.id === custId);
        setBuildingInfo(filteredBuildings);
        console.log(filteredBuildings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this building?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/building/delete/${id}`);
        // Remove the deleted building from the state
        setBuildingInfo(buildingInfo.filter(item => item.id !== id));
        alert("Building deleted successfully.");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboards">
      <Header />
      <div className="containers">
        <Nav />
        <main className="contents">
          <div className="cont">
            <h1 className="desc">Data Table</h1>
            <Link to='/AddBuilding'>Add Building</Link>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Location</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
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
                        style={{ width: "90px", height: "50px" }}
                      />
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <button className="edit-button">Edit</button>
                    </td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ManageBuilding;