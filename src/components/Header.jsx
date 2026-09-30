import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";

function Header({ setIsOpen }) {
  const [profileOpen, setProfileOpen] =
    useState(false);

  const [insuranceOpen, setInsuranceOpen] =
    useState(false);

  const navigate = useNavigate();

  const { insuranceTypes } = useApp();

  const handleInsuranceClick = () => {
    setInsuranceOpen(false);
    navigate("/settings/insurance-types");
  };

  return (
    <header className="sticky top-0 z-30 flex h-[70px] shrink-0 items-center justify-between border-b border-[#e7ebf1] bg-white px-4 sm:px-6 lg:px-7">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-[#516174] hover:bg-gray-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="relative">
          <button
            onClick={() =>
              setInsuranceOpen(
                !insuranceOpen
              )
            }
            className="flex h-10 items-center gap-3 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] px-3 text-[12px] font-medium text-[#526174] hover:bg-white"
          >
            <span>Insurance Type</span>

            <ChevronDown
              size={15}
              className={`transition-transform ${
                insuranceOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {insuranceOpen && (
            <div className="absolute left-0 top-[48px] z-50 w-[220px] rounded-xl border border-[#e5e9ef] bg-white p-2 shadow-lg">
              {insuranceTypes.map((item) => (
                <button
                  key={item.id}
                  onClick={handleInsuranceClick}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[12px] text-[#526174] hover:bg-[#f5f8fc] hover:text-[#2869df]"
                >
                  <span>{item.name}</span>

                  <span className="text-[9px] text-[#9aa6b5]">
                    {item.code}
                  </span>
                </button>
              ))}

              {insuranceTypes.length === 0 && (
                <p className="px-3 py-3 text-[11px] text-[#718096]">
                  No insurance types
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative rounded-lg p-2 text-[#5f6f83] hover:bg-gray-100">
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="h-7 w-px bg-[#e5e9ef]" />

        <div className="relative">
          <button
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
            className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2869df] text-[12px] font-semibold text-white">
              JS
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-[12px] font-semibold text-[#243b5a]">
                Joyal Shaji
              </p>

              <p className="text-[10px] text-[#8190a3]">
                Agent
              </p>
            </div>

            <ChevronDown
              size={14}
              className={`text-[#667487] transition-transform ${
                profileOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-[52px] z-50 w-[210px] rounded-xl border border-[#e5e9ef] bg-white p-2 shadow-lg">
              <button
                onClick={() =>
                  navigate("/profile")
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#526174] hover:bg-[#f5f8fc]"
              >
                <UserRound size={16} />
                My Profile
              </button>

              <button
                onClick={() =>
                  navigate("/settings/users")
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#526174] hover:bg-[#f5f8fc]"
              >
                <Settings size={16} />
                Settings
              </button>

              <div className="my-1 border-t border-[#edf0f4]" />

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-red-500 hover:bg-red-50">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;