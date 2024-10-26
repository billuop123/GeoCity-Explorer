export async function signUp(formData) {
  const { name, email, password, passwordConfirm, age } = formData;
  try {
    const response = await fetch("http://127.0.0.1:9000/api/v2/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, passwordConfirm, age }),
    });

    const data = await response.json();

    return data; // Process the data
  } catch (error) {
    console.error("Error:", error); // Log any error that occurs
  }
}
