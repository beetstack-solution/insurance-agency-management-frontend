import {
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Layout from "../../components/Layout";
import { useApp } from "../../context/AppContext";

function Permissions() {
  const {
    permissions,
    addPermission,
    deletePermission,
    modules,
    moduleActions,
  } = useApp();

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    module: "",
    action: "",
  });

  const submit = (e) => {
    e.preventDefault();

    const module = form.module;
    const action = form.action;

    addPermission({
      module,
      action,
      code: `${module.toLowerCase()}.${action.toLowerCase()}`,
    });

    setForm({
      module: "",
      action: "",
    });

    setShowForm(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#102b52]">
              Permissions
            </h1>

            <p className="mt-1 text-[13px] text-[#718096]">
              Manage available module permissions.
            </p>
          </div>

          <button
            onClick={() =>
              setShowForm(!showForm)
            }
            className="flex w-fit items-center gap-2 rounded-lg bg-[#2869df] px-4 py-2.5 text-[13px] text-white"
          >
            <Plus size={17} />
            Add Permission
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={submit}
            className="rounded-xl border border-[#e5eaf0] bg-white p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                required
                value={form.module}
                onChange={(e) =>
                  setForm({
                    ...form,
                    module: e.target.value,
                  })
                }
                className="h-10 rounded-lg border px-3 text-[12px]"
              >
                <option value="">
                  Select Module
                </option>

                {modules.map((module) => (
                  <option
                    key={module.id}
                    value={module.name}
                  >
                    {module.name}
                  </option>
                ))}
              </select>

              <select
                required
                value={form.action}
                onChange={(e) =>
                  setForm({
                    ...form,
                    action: e.target.value,
                  })
                }
                className="h-10 rounded-lg border px-3 text-[12px]"
              >
                <option value="">
                  Select Action
                </option>

                {moduleActions.map((action) => (
                  <option
                    key={action.id}
                    value={action.name}
                  >
                    {action.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 rounded-lg bg-[#2869df] px-4 py-2 text-[12px] text-white"
            >
              Create Permission
            </button>
          </form>
        )}

        <div className="overflow-x-auto rounded-xl border border-[#e5eaf0] bg-white">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                  Module
                </th>

                <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                  Action
                </th>

                <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                  Permission Code
                </th>

                <th className="px-5 py-3 text-right text-[10px] uppercase text-[#718096]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {permissions.map((permission) => (
                <tr
                  key={permission.id}
                  className="border-t border-[#edf1f5]"
                >
                  <td className="px-5 py-4 text-[12px] font-semibold">
                    {permission.module}
                  </td>

                  <td className="px-5 py-4 text-[11px]">
                    {permission.action}
                  </td>

                  <td className="px-5 py-4 text-[11px] text-[#2869df]">
                    {permission.code}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() =>
                        deletePermission(
                          permission.id
                        )
                      }
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Permissions;