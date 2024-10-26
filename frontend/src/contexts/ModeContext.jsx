import { createContext, useContext, useReducer } from "react";

const ModeContext = createContext();
const initialState = {
  darkMode: false,
  currentCity: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "toDarkMode":
      return { ...state, darkMode: true };
    case "toNormalMode":
      return { ...state, darkMode: false };
    case "currentCity":
      return { ...state, currentCity: action.payload };
    default:
      throw new Error("type not distinguished");
  }
}
export function ModeProvider({ children }) {
  const [{ darkMode, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <ModeContext.Provider value={{ darkMode, dispatch, currentCity }}>
      {children}
    </ModeContext.Provider>
  );
}
export function useMode() {
  const contextData = useContext(ModeContext);
  if (contextData === undefined) console.error("Context Data is undefined");
  return contextData;
}
