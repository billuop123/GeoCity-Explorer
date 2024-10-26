import { useParams } from "react-router-dom";
import { useDetails } from "../contexts/UserContext";
import { useMode } from "../contexts/ModeContext";
import { useEffect } from "react";

function CityInfo() {
  const { places } = useDetails();
  const { id } = useParams();

  const { dispatch } = useMode();
  const { cityName, country, emoji, notes } = places.find(
    (item) => item._id === id
  );
  useEffect(
    function () {
      dispatch({ type: "currentCity", payload: id });
    },
    [dispatch, id]
  );

  console.log(cityName, country, emoji, notes);
  return (
    <div>
      <h1>
        {cityName},{country}
      </h1>
      <p>
        {notes} ,{emoji}
      </p>
    </div>
  );
}

export default CityInfo;
