import {
  Edit,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import Layout from "../../components/Layout";
import { useApp } from "../../context/AppContext";

function InsuranceTypes() {
  const {
    insuranceTypes,
    addInsuranceType,
    updateInsuranceType,
    deleteInsuranceType,
  } = useApp();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    status: "Active",
  });

  const filtered = insuranceTypes.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.code
        .toLowerCase()
        .includes(search.toLowerCase())
  );

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

  const submit = (e) => {
    e.preventDefault();

    if (editing) {
      updateInsuranceType(editing.id, form);
    } else {
      addInsuranceType(form);
    }

    setShowModal(false);
  };

  const remove = (id) => {
    if (
      window.confirm(
        "Delete this insurance type?"
      )
    ) {
      deleteInsuranceType(id);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#102b52]">
              Insurance Types
            </h1>
            <p className="mt-1 text-[13px] text-[#718096]">
              Manage insurance categories available in the system.
            </p>
          </div>

          <button
            onClick={openAdd}
            className="flex w-fit items-center gap-2 rounded-lg bg-[#2869df] px-4 py-2.5 text-[13px] font-medium text-white"
          >
            <Plus size={17} />
            Add Insurance Type
          </button>
        </div>

        <div className="rounded-xl border border-[#e5eaf0] bg-white">
          <div className="border-b border-[#e8edf3] p-4">
            <div className="relative max-w-[320px]">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a97a8]"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search insurance types..."
                className="h-10 w-full rounded-lg border border-[#dfe5ec] pl-10 pr-4 text-[12px] outline-none focus:border-[#2869df]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#f8fafc]">
                  <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                    Code
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] uppercase text-[#718096]">
                    Description
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
                {filtered.map((item) => (
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
                          className="rounded-lg p-2 text-[#64748b] hover:bg-blue-50 hover:text-[#2869df]"
                        >
                          <Edit size={15} />
                        </button>

                        <button
                          onClick={() =>
                            remove(item.id)
                          }
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
      </div>

      {showModal && (
        <Modal
          title={
            editing
              ? "Edit Insurance Type"
              : "Add Insurance Type"
          }
          onClose={() => setShowModal(false)}
        >
          <form
            onSubmit={submit}
            className="space-y-4"
          >
            <Input
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Life Insurance"
            />

            <Input
              label="Code"
              value={form.code}
              onChange={(e) =>
                setForm({
                  ...form,
                  code: e.target.value.toUpperCase(),
                })
              }
              placeholder="LIFE"
            />

            <Input
              label="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Insurance description"
            />

            <Select
              label="Status"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              options={["Active", "Inactive"]}
            />

            <Actions
              editing={editing}
              onCancel={() =>
                setShowModal(false)
              }
            />
          </form>
        </Modal>
      )}
    </Layout>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-[480px] rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[#102b52]">
            {title}
          </h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
        {label}
      </label>

      <input
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function Actions({ editing, onCancel }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-[#dfe5ec] px-4 py-2.5 text-[12px]"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="rounded-lg bg-[#2869df] px-4 py-2.5 text-[12px] text-white"
      >
        {editing ? "Update" : "Create"}
      </button>
    </div>
  );
}

export default InsuranceTypes;