import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function DefaultLayout() {
  return (
    <div className="w-full">
      <Navbar />
      <main className="px-60 py-20 flex flex-col justify-center">
        <Outlet />
      </main>
    </div>
  );
}
