import LoginForm from "./components/LoginForm";
import { ModeProvider } from "./contexts/ModeContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Map from "./components/Map";
import Form from "./components/Form";
import Cities from "./components/Cities";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorBoundary from "./components/ErrorBoundary";
import CityInfo from "./components/CityInfo";
import SignupForm from "./components/Signup";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      state: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ModeProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route
              path="/map"
              element={
                <ErrorBoundary>
                  <Map />
                </ErrorBoundary>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="form" element={<Form />}></Route>
              <Route path="cities" element={<Cities />} />
              <Route path="cities/:id" element={<CityInfo />} />
            </Route>
            <Route path="signup" element={<SignupForm />} />
          </Routes>
        </BrowserRouter>
      </ModeProvider>
    </QueryClientProvider>
  );
}

export default App;
