import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Header setIsOpen={setIsOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}