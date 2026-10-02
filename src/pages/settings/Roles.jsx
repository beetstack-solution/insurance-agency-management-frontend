import {
  Edit,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

function Roles() {
  const {
    roles,
    users,
    addRole,
    updateRole,
    deleteRole,
  } = useApp();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  const getUserCount = (roleName) => {
    return users.filter(
      (user) => user.role === roleName
    ).length;
  };

  const filteredRoles = roles.filter((role) => {
    const value = search.toLowerCase();

    return (
      role.name.toLowerCase().includes(value) ||
      role.description
        .toLowerCase()
        .includes(value)
    );
  });

  const openAddModal = () => {
    setEditingRole(null);

    setForm({
      name: "",
      description: "",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (role) => {
    setEditingRole(role);

    setForm({
      name: role.name,
      description: role.description,
      status: role.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingRole) {
      updateRole(editingRole.id, form);
    } else {
      addRole(form);
    }

    setShowModal(false);
  };

  const handleDelete = (role) => {
    const count = getUserCount(role.name);

    if (count > 0) {
      alert(
        `Cannot delete ${role.name}. ${count} user(s) are assigned to this role.`
      );
      return;
    }

    if (
      window.confirm(
        `Are you sure you want to delete ${role.name}?`
      )
    ) {
      deleteRole(role.id);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[#102b52]">
              Roles
            </h1>

            <p className="mt-1 text-[13px] text-[#718096]">
              Create and manage roles for your organization.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex w-fit items-center gap-2 rounded-lg bg-[#2869df] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#1f5bc5]"
          >
            <Plus size={17} />
            Add Role
          </button>
        </div>

        <div className="rounded-xl border border-[#e5eaf0] bg-white">
          <div className="border-b border-[#e8edf3] p-4">
            <div className="relative w-full max-w-[320px]">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a97a8]"
              />

              <input
                type="text"
                placeholder="Search roles..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="h-10 w-full rounded-lg border border-[#dfe5ec] pl-10 pr-4 text-[12px] outline-none focus:border-[#2869df]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-[#e8edf3] bg-[#f8fafc]">
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                    Role
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                    Description
                  </th>

                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                    Users
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
                {filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    className="border-b border-[#edf1f5] last:border-0"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2869df]">
                          <ShieldCheck size={18} />
                        </div>

                        <span className="text-[12px] font-semibold text-[#243b5a]">
                          {role.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-[11px] text-[#718096]">
                      {role.description}
                    </td>

                    <td className="px-5 py-4 text-[11px] font-medium text-[#243b5a]">
                      {getUserCount(role.name)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                          role.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {role.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            openEditModal(role)
                          }
                          className="rounded-lg p-2 text-[#64748b] hover:bg-blue-50 hover:text-[#2869df]"
                        >
                          <Edit size={15} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(role)
                          }
                          className="rounded-lg p-2 text-[#64748b] hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRoles.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-10 text-center text-[12px] text-[#718096]"
                    >
                      No roles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[480px] rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e8edf3] px-5 py-4">
              <h2 className="text-[16px] font-semibold text-[#102b52]">
                {editingRole
                  ? "Edit Role"
                  : "Add Role"}
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
              className="space-y-4 p-5"
            >
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Role Name
                </label>

                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
                  placeholder="Enter role name"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Description
                </label>

                <textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[90px] w-full rounded-lg border border-[#dfe5ec] p-3 text-[12px] outline-none focus:border-[#2869df]"
                  placeholder="Enter role description"
                />
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
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="rounded-lg border border-[#dfe5ec] px-4 py-2.5 text-[12px] font-medium text-[#526174]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#2869df] px-4 py-2.5 text-[12px] font-medium text-white"
                >
                  {editingRole
                    ? "Update Role"
                    : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Roles;