import { CiSun } from "react-icons/ci";
import { useMode } from "../contexts/ModeContext";
import { useEffect, useState } from "react";
import Button from "./Button";
import { FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { citiesDataFetch, loginDatafetch } from "../../utils/loginData";
import { useDetails } from "../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
function LoginForm() {
  const { dispatch: userDispatch } = useDetails();
  const { dispatch, darkMode } = useMode();
  const [mode, setMode] = useState(false);
  const [email, setEmail] = useState("biplovthapa966@gmail.com");
  const [password, setPassword] = useState("test1234");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(
    function () {
      setMode(darkMode);
    },
    [darkMode]
  );
  async function handleClick(e) {
    e.preventDefault();
    setIsLoading(true);
    //console.log(await loginDatafetch(email, password));
    dispatch({ type: "currentCity", payload: "" });
    const {
      data: {
        user: { name, cities },
      },

      status,
      message,
    } = await loginDatafetch(email, password);
    const newObj = { name, cities, email };
    userDispatch({ type: "user/login", payload: newObj });
    setIsLoading(false);

    if (status === "success") navigate("/map");
    if (status === "fail") setMessage(message);
  }
  function handleNormalMode() {
    dispatch({ type: "toNormalMode" });
  }
  function handleDarkMode() {
    dispatch({ type: "toDarkMode" });
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <div className={mode ? "dark" : "normal"}>
      {mode ? (
        <CiSun
          onClick={handleNormalMode}
          className="absolute top-0 right-0 m-8 bg-slate-100 rounded-full"
          size={40}
        />
      ) : (
        <FaMoon
          onClick={handleDarkMode}
          className="absolute top-0 right-0 m-8"
          size={30}
        />
      )}

      <form className={mode ? "darkForm" : "normalForm"}>
        <label
          htmlFor="username "
          className={mode ? "labelDark" : "labelNormal"}
        >
          Username
        </label>
        <input
          type="text"
          placeholder="username(optional)"
          className={mode ? "inputDark" : "inputNormal"}
        />
        <label
          htmlFor="username"
          className={mode ? "labelDark" : "labelNormal"}
        >
          Email
        </label>
        <input
          type="text"
          placeholder="example@gmail.com"
          className={mode ? "inputDark" : "inputNormal"}
          value={email}
          onChange={handleEmail}
        />
        <label
          htmlFor="username"
          className={mode ? "labelDark" : "labelNormal"}
        >
          Password
        </label>
        <input
          type="text"
          placeholder="password"
          className={mode ? "inputDark" : "inputNormal"}
          value={password}
          onChange={handlePassword}
        />
        <Button handleClick={handleClick}>
          {isLoading ? "Loading...." : "Login"}
        </Button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default LoginForm;
