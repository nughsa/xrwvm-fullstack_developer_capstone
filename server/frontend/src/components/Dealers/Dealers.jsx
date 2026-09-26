import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Dealers.css";
import "../assets/style.css";
import Header from "../Header/Header";
import review_icon from "../assets/reviewicon.png";

const Dealers = () => {
  const navigate = useNavigate();
  const { state } = useParams();

  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

  const dealer_url = "/djangoapp/get_dealers";

  // Ambil semua dealer
  const get_dealers = async () => {
    try {
      const res = await fetch(dealer_url, {
        method: "GET",
      });

      const retobj = await res.json();

      if (retobj.status === 200) {
        const all_dealers = Array.from(retobj.dealers);

        // Ambil daftar state untuk dropdown
        const stateList = [];

        all_dealers.forEach((dealer) => {
          stateList.push(dealer.state);
        });

        setStates(Array.from(new Set(stateList)));

        // Tampilkan semua dealer
        setDealersList(all_dealers);
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  // Ambil dealer berdasarkan state
  const get_dealers_by_state = async (selectedState) => {
    try {
      const res = await fetch(
        `/djangoapp/get_dealers/${encodeURIComponent(selectedState)}`,
        {
          method: "GET",
        }
      );

      const retobj = await res.json();

      if (retobj.status === 200) {
        const state_dealers = Array.from(retobj.dealers);

        setDealersList(state_dealers);
      } else {
        setDealersList([]);
      }
    } catch (error) {
      console.error("Error fetching dealers by state:", error);
      setDealersList([]);
    }
  };

  // Ketika dropdown berubah
  const filterDealers = (selectedState) => {
    if (selectedState === "All") {
      navigate("/dealers");
      return;
    }

    navigate(`/dealers/${encodeURIComponent(selectedState)}`);
  };

  // Load data berdasarkan URL
  useEffect(() => {
    if (state) {
      get_dealers_by_state(state);
    } else {
      get_dealers();
    }
  }, [state]);

  const isLoggedIn = sessionStorage.getItem("username") !== null;

  return (
    <div>
      <Header />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>

            <th>Dealer Name</th>

            <th>City</th>

            <th>Address</th>

            <th>Zip</th>

            <th>
              <select
                name="state"
                id="state"
                value={state || ""}
                onChange={(e) => filterDealers(e.target.value)}
              >
                {!state && (
                  <option value="" disabled>
                    State
                  </option>
                )}

                <option value="All">All States</option>

                {states.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </th>

            {isLoggedIn && <th>Review Dealer</th>}
          </tr>
        </thead>

        <tbody>
          {dealersList.map((dealer) => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>

              <td>
                <a href={`/dealer/${dealer.id}`}>
                  {dealer.full_name}
                </a>
              </td>

              <td>{dealer.city}</td>

              <td>{dealer.address}</td>

              <td>{dealer.zip}</td>

              <td>{dealer.state}</td>

              {isLoggedIn && (
                <td>
                  <a href={`/postreview/${dealer.id}`}>
                    <img
                      src={review_icon}
                      className="review_icon"
                      alt="Post Review"
                    />
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;