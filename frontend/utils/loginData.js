export async function loginDatafetch(email, password) {
  try {
    const response = await fetch("http://127.0.0.1:9000/api/v2/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data; // Process the data
  } catch (error) {
    console.error("Error:", error); // Log any error that occurs
  }
}
export async function citiesDataFetch(email) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Optional delay

    const response = await fetch(
      "http://127.0.0.1:9000/api/v2/users/fetchcities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the API response for debugging

    return data.data?.cities || []; // Return an empty array if cities is undefined
  } catch (error) {
    console.error("Error:", error); // Log any error that occurs
    return []; // Return an empty array in case of an error
  }
}
