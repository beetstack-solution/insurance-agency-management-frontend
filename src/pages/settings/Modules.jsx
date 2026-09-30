import {
  Edit,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import Layout from "../../components/Layout";
import { useApp } from "../../context/AppContext";

function Modules() {
  const {
    modules,
    moduleTypes,
    addModule,
    updateModule,
    deleteModule,
  } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "Core",
    status: "Active",
  });

  const openAdd = () => {
    setEditing(null);

    setForm({
      name: "",
      code: "",
      type: "Core",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditing(item);

    setForm({
      name: item.name,
      code: item.code,
      type: item.type,
      status: item.status,
    });

    setShowModal(true);
  };

  const submit = (e) => {
    e.preventDefault();

    if (editing) {
      updateModule(editing.id, form);
    } else {
      addModule(form);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this module?")) {
      deleteModule(id);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#102b52]">
              Modules
            </h1>

            <p className="mt-1 text-[13px] text-[#718096]">
              Manage application modules and their types.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex w-fit items-center gap-2 rounded-lg bg-[#2869df] px-4 py-2.5 text-[13px] text-white hover:bg-[#1f5bc5]"
          >
            <Plus size={17} />
            Add Module
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#e5eaf0] bg-white">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Module
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Code
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Type
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
              {modules.map((item) => (
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
                    {item.type}
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
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-2 text-[#64748b] hover:bg-blue-50 hover:text-[#2869df]"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg p-2 text-[#64748b] hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {modules.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-[12px] text-[#718096]"
                  >
                    No modules found
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
                {editing ? "Edit Module" : "Add Module"}
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1.5 text-[#718096] hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={submit}
              className="space-y-4"
            >
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Module Name
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Module name"
                  className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Module Code
                </label>

                <input
                  required
                  value={form.code}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="Module code"
                  className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Module Type
                </label>

                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                    })
                  }
                  className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
                >
                  {moduleTypes.map((type) => (
                    <option
                      key={type.id}
                      value={type.name}
                    >
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Status
                </label>

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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-[#dfe5ec] px-4 py-2.5 text-[12px] font-medium text-[#526174] hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#2869df] px-4 py-2.5 text-[12px] font-medium text-white hover:bg-[#1f5bc5]"
                >
                  {editing ? "Update Module" : "Create Module"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Modules;