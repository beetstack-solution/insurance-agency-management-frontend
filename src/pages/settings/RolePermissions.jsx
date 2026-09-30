import {
  Check,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import Layout from "../../components/Layout";
import { useApp } from "../../context/AppContext";

function RolePermissions() {
  const {
    roles,
    modules,
    moduleActions,
    hasRolePermission,
    toggleRolePermission,
  } = useApp();

  const [selectedRole, setSelectedRole] =
    useState("Admin");

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#102b52]">
            Role Permissions
          </h1>

          <p className="mt-1 text-[13px] text-[#718096]">
            Assign module actions to system roles.
          </p>
        </div>

        <div className="rounded-xl border border-[#e5eaf0] bg-white">
          <div className="flex flex-col gap-4 border-b border-[#e8edf3] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-[#243b5a]">
                Permission Matrix
              </h2>

              <p className="mt-1 text-[11px] text-[#718096]">
                Select a role and enable or disable module actions.
              </p>
            </div>

            <select
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value)
              }
              className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] sm:w-[190px]"
            >
              {roles.map((role) => (
                <option
                  key={role.id}
                  value={role.name}
                >
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                    Module
                  </th>

                  {moduleActions.map((action) => (
                    <th
                      key={action.id}
                      className="px-5 py-3 text-center text-[10px] uppercase text-[#718096]"
                    >
                      {action.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {modules.map((module) => (
                  <tr
                    key={module.id}
                    className="border-t border-[#edf1f5]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#2869df]">
                          <ShieldCheck size={16} />
                        </div>

                        <span className="text-[12px] font-medium text-[#243b5a]">
                          {module.name}
                        </span>
                      </div>
                    </td>

                    {moduleActions.map((action) => {
                      const active =
                        hasRolePermission(
                          selectedRole,
                          module.name,
                          action.name
                        );

                      return (
                        <td
                          key={action.id}
                          className="px-5 py-4 text-center"
                        >
                          <button
                            onClick={() =>
                              toggleRolePermission(
                                selectedRole,
                                module.name,
                                action.name
                              )
                            }
                            className={`mx-auto flex h-7 w-7 items-center justify-center rounded-lg ${
                              active
                                ? "bg-[#2869df] text-white"
                                : "bg-gray-100 text-[#9ca7b5]"
                            }`}
                          >
                            {active ? (
                              <Check size={15} />
                            ) : (
                              <X size={14} />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RolePermissions;