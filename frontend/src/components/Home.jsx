import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">SignUp</Link>
    </div>
  );
}

export default Home;
