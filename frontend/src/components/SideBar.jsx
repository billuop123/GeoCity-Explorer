import { Outlet } from "react-router-dom";

export const cities = [
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: "73930385",
  },
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: "17806751",
  },
];
function SideBar() {
  return (
    <div className="bg-slate-500 w-96 h-full mr-4 shadow-lg flex flex-col ">
      <Outlet />
    </div>
  );
}

export default SideBar;
