import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <main className="min-w-0 flex-1">
          <Header setIsOpen={setIsOpen} />

          <div className="p-4 sm:p-5 lg:p-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;