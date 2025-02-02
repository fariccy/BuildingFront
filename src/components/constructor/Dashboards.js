import { useEffect, useState } from "react";
import Footer from "../dash/Footer";
import Header from "../dash/Header";
import Nav from "../dash/Nev";
import axios from "axios";

const Dashboard = () => {

  const [buildingInfo, setBuildingInfo] = useState("No Data");
  const [error, setError] = useState(null);



  const [custId, setCustId] = useState(parseInt(localStorage.getItem('custId')) || 0); // Default to 0 if not found
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://building-solution-app-fdd7139e9f3e.herokuapp.com/api/building/all"
        );
        // Filter buildings based on customer id
        const filteredBuildings = response.data.filter(item => item.customer.id === custId);
        setBuildingInfo(filteredBuildings.length);
        console.log(filteredBuildings);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);



  const [feedbacks, setFeedbacks] = useState("No Data");
  const [buildings, setBuildings] = useState([]);
  const [constructorId, setConstructorId] = useState(parseInt(localStorage.getItem('custId')) || 0); // Set this to the desired constructor ID

  useEffect(() => {
    const fetchData = async () => {
        try {
            const feedbackResponse = await axios.get('https://building-solution-app-fdd7139e9f3e.herokuapp.com/api/feedback/all');
            const buildingResponse = await axios.get('https://building-solution-app-fdd7139e9f3e.herokuapp.com/api/building/all');
            
            // Filter feedbacks based on constructorId
            const filteredFeedbacks = feedbackResponse.data.filter(feedback => feedback.building.customer.id === constructorId);
            
            setFeedbacks(filteredFeedbacks.length);
            setBuildings(buildingResponse.data);
        } catch (err) {
            setError(err.message);
        }
    };

    fetchData();
}, [constructorId]);
    
  return (
    <div class="dashboards">
      <Header />
      <div class="containers">
        <Nav />
        <main class="contents">
          <h2>Welcome to Your Dashboard </h2>
          

          <div class="card-container">
            <div class="card">
              <h2>Total Building</h2>
              {/* <p>Register buildings.</p> */}
              <span class="count">{buildingInfo}</span>
            </div>
            <div class="card">
              <h2>Total Feedback </h2>
              {/* <p>This is the second card.</p> */}
              <span class="count"> {feedbacks}</span>
            </div>
            {/* <div class="card">
              <h2>Constructor </h2>
              <p>This is the third card.</p>
              <span class="count">Count: 0</span>
            </div> */}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
