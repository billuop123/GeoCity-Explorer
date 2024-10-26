export async function addPlace({
  cityName,
  countryName: country,
  emoji,
  lat,
  lng,
  email,
  notes,
}) {
  const data = {
    email,
    place: {
      cityName,
      country,
      emoji,
      notes: notes || "A great place to visit ",
      position: {
        lat,
        lng,
      },
    },
  };
  try {
    const response = await fetch(
      "http://127.0.0.1:9000/api/v2/users/addPlace",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (result.status === "success")
      console.log("Place added successfully:", result);
  } catch (error) {
    console.error("Failed to add place:", error);
  }
}
