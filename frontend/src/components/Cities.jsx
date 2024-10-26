import SideBarItems from "./SideBarItems";
import { useDetails } from "../contexts/UserContext";
import { citiesDataFetch } from "../../utils/loginData";

import { useEffect, useState } from "react";

function Cities() {
  const { email, places, dispatch } = useDetails();
  const [isLoading, setIsLoading] = useState(false);
  // Use email directly from context
  useEffect(
    function () {
      async function fetchCities() {
        setIsLoading(true);
        const data = await citiesDataFetch(email);
        dispatch({ type: "user/updatePlace", payload: data });
        setIsLoading(false);
      }
      fetchCities();
    },
    [email, dispatch]
  );

  // const {
  //   data: cities,
  //   error,
  //   isLoading,
  //   isError,
  // } = useQuery(["cities"], () => citiesDataFetch(email));
  // console.log(email, cities);
  // if (isLoading) return <div>Loading cities...</div>;
  // if (isError) return <div>Error loading cities: {error.message}</div>;
  // if () {
  //   return <p>Click on the map and select the city</p>;
  // }
  if (places.length === 0)
    return (
      <p>
        Click on the map to select the places you have already visited and share
        some memory(make sure you are logged in)
      </p>
    );
  return (
    <>
      {places.map((item) => (
        <SideBarItems item={item} key={item.cityName} />
      ))}
      {isLoading && <h1>Loading.......</h1>}
    </>
  );
}

export default Cities;
