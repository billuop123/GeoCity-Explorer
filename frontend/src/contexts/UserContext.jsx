import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();
const initialState = {
  name: "",
  places: [],
  email: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "user/login":
      return {
        ...state,
        name: action.payload.name,
        places: action.payload.cities,
        email: action.payload.email,
      };
    case "user/updatePlace": {
      return { ...state, places: action.payload };
    }
    case "user/logout":
      return { initialState };
    default:
      throw new Error("Check action type");
  }
}
export function UserContextProvider({ children }) {
  const [{ name, places, email }, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ name, places, dispatch, email }}>
      {children}
    </UserContext.Provider>
  );
}
export function useDetails() {
  const details = useContext(UserContext);
  if (details === undefined) console.log("Details is undefined");
  return details;
}
