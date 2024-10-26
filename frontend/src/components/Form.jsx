import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import Message from "./Message";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { addPlace } from "../../utils/formDataPush";
import { useDetails } from "./../contexts/UserContext";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [emoji, setEmoji] = useState("");
  const { lat, lng } = useUrlPosition();
  const [geoCodingError, setGeoCodingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useDetails();
  const [notes, setNote] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    addPlace({ cityName, countryName, emoji, lat, lng, email, notes });

    navigate("/map"); // Passing as an object
  }

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          if (!lat && !lng) return;
          setIsLoading(true);
          setGeoCodingError(""); // Reset error when coordinates change
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setIsLoading(false);
          if (!data.city) {
            throw new Error(
              "This seems to be in the middle of nowhere, try again💩"
            );
          }
          if (!data.cityName || data.countryName || data.emoji)
            <Message message="missing Fields" />;
          setCityName(data.city);
          setCountryName(data.countryName);
          setEmoji(data.countryCode);
        } catch (err) {
          setIsLoading(false);
          setGeoCodingError(err.message);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  if (!lat && !lng)
    return <Message message={`Start by clicking somewhere on the map`} />;
  if (geoCodingError) return <Message message={`${geoCodingError}`} />;
  if (isLoading) return <Message message={`Loading.....`} />;

  return (
    <form>
      <label className="block mb-2">City Name</label>
      <input
        type="text"
        className="rounded-md p-2 mb-2 w-56 ml-2 focus:outline-none"
        placeholder="cityname"
        defaultValue={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <label className="block mb-2">Country Name</label>
      <input
        type="text"
        className="w-56 p-2 rounded-md focus:outline-none ml-2 mb-2"
        placeholder="countryname"
        onChange={(e) => setCountryName(e.target.value)}
        value={countryName}
      />
      <label className="block mb-2">Emoji</label>
      <input
        type="text"
        className="w-56 p-2 rounded-md focus:outline-none ml-2 mb-2"
        placeholder="emoji"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
      />
      <label className="block mb-2">Notes</label>
      <input
        type="text"
        className="w-56 p-2 rounded-md focus:outline-none ml-2 mb-2"
        placeholder="share your memories"
        value={notes}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        className="bg-slate-100 p-2 rounded-md ml-2"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
