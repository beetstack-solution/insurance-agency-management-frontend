import { useRbac } from "../rbac/useRbac";

export default function Quotations() {
  const { canScoped } = useRbac();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#102b52]">Quotations</h1>

        {canScoped("QUOTATION_MANAGEMENT", "CREATE") && (
          <button className="rounded-lg bg-[#2869df] px-4 py-2 text-[12px] font-semibold text-white">
            New Quotation
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-[#e5e9ef] bg-white p-6">
        <p className="text-[13px] text-[#526174]">
          Quotation list goes here.
        </p>
      </div>
    </div>
  );
}