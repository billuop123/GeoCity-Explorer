import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDetails } from "../contexts/UserContext";
import { deleteCity } from "../../utils/deleteCity";
import { useEffect, useState } from "react";
import { citiesDataFetch } from "../../utils/loginData";
import { useMode } from "../contexts/ModeContext";

function SideBarItems({ item }) {
  const { email, dispatch } = useDetails();
  const { currentCity } = useMode();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function handleDelete() {
    setIsLoading(true);
    deleteCity(email, item.cityName);
    const data = await citiesDataFetch(email);
    dispatch({ type: "user/updatePlace", payload: data });
    navigate("/map");
    setIsLoading(false);
  }

  return (
    <>
      {item._id === currentCity ? (
        <div className="flex border border-slate-700 ">
          <NavLink
            to={`${item._id}?lat=${item.position.lat}&lng=${item.position.lng}`}
            className="m-4 text-3xl font-bold"
          >
            <span>
              {item.cityName},{item.country}
            </span>
          </NavLink>
          <button onClick={handleDelete}>❌</button>
        </div>
      ) : (
        <div className="flex ">
          <NavLink
            to={`${item._id}?lat=${item.position.lat}&lng=${item.position.lng}`}
            className="m-4 text-3xl font-bold"
          >
            <span>
              {item.cityName},{item.country}
            </span>
          </NavLink>
          <button onClick={handleDelete}>❌</button>
        </div>
      )}

      {isLoading && <h1>Loading........</h1>}
    </>
  );
}

export default SideBarItems;
