import { Edit, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

function ModuleTypes() {
  const {
    moduleTypes,
    addModuleType,
    updateModuleType,
    deleteModuleType,
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    status: "Active",
  });

  const openAdd = () => {
    setEditing(null);

    setForm({
      name: "",
      code: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);

    setForm({
      name: item.name,
      code: item.code,
      description: item.description,
      status: item.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      updateModuleType(editing.id, form);
    } else {
      addModuleType(form);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this module type?")) {
      deleteModuleType(id);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#102b52]">
              Module Types
            </h1>

            <p className="mt-1 text-[13px] text-[#718096]">
              Manage module types used in the application.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex w-fit items-center gap-2 rounded-lg bg-[#2869df] px-4 py-2.5 text-[13px] text-white hover:bg-[#1f5bc5]"
          >
            <Plus size={17} />
            Add Module Type
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e5eaf0] bg-white">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Name
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Code
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Description
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase text-[#718096]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {moduleTypes.map((item) => (
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

                  <td className="px-5 py-4 text-[11px] text-[#718096]">
                    {item.description}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        item.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          openEdit(item)
                        }
                        className="rounded-lg p-2 text-[#64748b] hover:bg-blue-50 hover:text-[#2869df]"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="rounded-lg p-2 text-[#64748b] hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {moduleTypes.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-[12px] text-[#718096]"
                  >
                    No module types found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[460px] rounded-xl bg-white p-5 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold text-[#102b52]">
                {editing
                  ? "Edit Module Type"
                  : "Add Module Type"}
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="rounded-lg p-1.5 text-[#718096] hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
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
                placeholder="Module type name"
                className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
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
                placeholder="Module type code"
                className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
              />

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                rows="3"
                className="w-full resize-none rounded-lg border border-[#dfe5ec] px-3 py-2.5 text-[12px] outline-none focus:border-[#2869df]"
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value,
                  })
                }
                className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
              >
                <option value="Active">
                  Active
                </option>
                <option value="Inactive">
                  Inactive
                </option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="rounded-lg border border-[#dfe5ec] px-4 py-2.5 text-[12px] text-[#526174]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#2869df] px-4 py-2.5 text-[12px] font-medium text-white"
                >
                  {editing
                    ? "Update Module Type"
                    : "Create Module Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModuleTypes;