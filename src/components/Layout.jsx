import { Outlet } from "react-router";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f5f8fc]">

      {/* ONE SIDEBAR */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        {/* ONE HEADER */}
        <Header
          setIsOpen={setIsOpen}
        />

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1 p-4 sm:p-5 lg:p-7">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;