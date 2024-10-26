export async function deleteCity(email, cityName) {
  try {
    // Optional delay

    const response = await fetch(
      "http://127.0.0.1:9000/api/v2/users/deleteplace",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, cityName }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the API response for debugging

    // Return an empty array if cities is undefined
  } catch (error) {
    console.error("Error:", error); // Log any error that occurs
    return []; // Return an empty array in case of an error
  }
}
