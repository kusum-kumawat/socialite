import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function RootLayout() {
  return (
    <main className="flex flex-col h-screen">
      <Sidebar />
      <div className="text-white ml-64">
        <section className="flex justify-center">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default RootLayout;
