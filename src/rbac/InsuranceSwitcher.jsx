import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRbac } from "./useRbac";

export default function InsuranceSwitcher() {
  const { insuranceTypes, insuranceType, setSelectedInsuranceType } = useRbac();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  if (!insuranceTypes.length) return null;

  const onPick = (it) => {
    setSelectedInsuranceType(it);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-3 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] px-3 text-[12px] font-medium text-[#526174] hover:bg-white"
      >
        <span className="max-w-[160px] truncate">
          {insuranceType?.name || "Insurance Type"}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[48px] z-50 w-[260px] rounded-xl border border-[#e5e9ef] bg-white p-2 shadow-lg">
          {insuranceTypes.map((it) => {
            const selected = insuranceType?.id === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onPick(it)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[12px] hover:bg-[#f5f8fc] hover:text-[#2869df] ${
                  selected ? "bg-[#f0f5ff] text-[#2869df]" : "text-[#526174]"
                }`}
              >
                <span className="truncate">{it.name}</span>
                <span className="ml-2 shrink-0 text-[9px] text-[#9aa6b5]">
                  {it.code}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}