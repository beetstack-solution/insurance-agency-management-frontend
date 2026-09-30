import {
  Edit,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import Layout from "../../components/Layout";
import { useApp } from "../../context/AppContext";

function ModuleActions() {
  const {
    moduleActions,
    addModuleAction,
    updateModuleAction,
    deleteModuleAction,
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    status: "Active",
  });

  const submit = (e) => {
    e.preventDefault();

    if (editing) {
      updateModuleAction(editing.id, form);
    } else {
      addModuleAction(form);
    }

    setShowModal(false);
  };

  const openAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      code: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      code: item.code,
      status: item.status,
    });
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#102b52]">
              Module Actions
            </h1>

            <p className="mt-1 text-[13px] text-[#718096]">
              Manage actions available for application modules.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex w-fit items-center gap-2 rounded-lg bg-[#2869df] px-4 py-2.5 text-[13px] text-white"
          >
            <Plus size={17} />
            Add Action
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e5eaf0] bg-white">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                  Action
                </th>
                <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                  Code
                </th>
                <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-[10px] uppercase text-[#718096]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {moduleActions.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#edf1f5]"
                >
                  <td className="px-5 py-4 text-[12px] font-semibold text-[#243b5a]">
                    {item.name}
                  </td>

                  <td className="px-5 py-4 text-[11px] text-[#2869df]">
                    {item.code}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] text-green-600">
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          openEdit(item)
                        }
                        className="rounded-lg p-2 text-[#64748b] hover:bg-blue-50"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Delete this action?"
                            )
                          ) {
                            deleteModuleAction(
                              item.id
                            );
                          }
                        }}
                        className="rounded-lg p-2 text-[#64748b] hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[450px] rounded-xl bg-white p-5">
            <div className="mb-5 flex justify-between">
              <h2 className="text-[16px] font-semibold">
                {editing
                  ? "Edit Module Action"
                  : "Add Module Action"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={submit}
              className="space-y-4"
            >
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Action name"
                className="h-10 w-full rounded-lg border px-3 text-[12px]"
              />

              <input
                required
                value={form.code}
                onChange={(e) =>
                  setForm({
                    ...form,
                    code: e.target.value.toUpperCase(),
                  })
                }
                placeholder="Action code"
                className="h-10 w-full rounded-lg border px-3 text-[12px]"
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
                className="h-10 w-full rounded-lg border px-3 text-[12px]"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="rounded-lg border px-4 py-2 text-[12px]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#2869df] px-4 py-2 text-[12px] text-white"
                >
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ModuleActions;