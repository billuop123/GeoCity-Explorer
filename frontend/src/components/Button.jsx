import { useMode } from "../contexts/ModeContext";

function Button({ children, handleClick }) {
  const { darkMode } = useMode();
  return (
    <button
      onClick={handleClick}
      className={
        darkMode
          ? "border px-2 py-1 rounded-md bg-dark-highlight-color hover:bg-gray-400 border-none text-gray-500"
          : "border px-2 py-1 rounded-md bg-normal-highlight-color hover:bg-slate-200"
      }
    >
      {children}
    </button>
  );
}

export default Button;
