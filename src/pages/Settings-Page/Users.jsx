import {
  Edit,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import { useState } from "react";
import { useApp } from "../../context/AppContext";

function Users() {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
  } = useApp();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Agent",
    status: "Active",
  });

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.role.toLowerCase().includes(value)
    );
  });

  const openAddModal = () => {
    setEditingUser(null);

    setForm({
      name: "",
      email: "",
      role: "Agent",
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);

    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      updateUser(editingUser.id, form);
    } else {
      addUser(form);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user?"
      )
    ) {
      deleteUser(id);
    }
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-[24px] font-bold text-[#102b52]">
            Users
          </h1>

          <p className="mt-1 text-[13px] text-[#718096]">
            Manage users, roles and access permissions.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex w-fit items-center gap-2 rounded-lg bg-[#2869df] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#1f5bc5]"
        >
          <Plus size={17} />
          Add User
        </button>
      </div>

      {/* USERS TABLE */}
      <div className="rounded-xl border border-[#e5eaf0] bg-white">

        {/* SEARCH */}
        <div className="border-b border-[#e8edf3] p-4">

          <div className="relative w-full max-w-[320px]">

            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a97a8]"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-10 w-full rounded-lg border border-[#dfe5ec] pl-10 pr-4 text-[12px] outline-none focus:border-[#2869df]"
            />

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px]">

            <thead>
              <tr className="border-b border-[#e8edf3] bg-[#f8fafc]">

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  User
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Email
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase text-[#718096]">
                  Role
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

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-b border-[#edf1f5] last:border-0"
                >

                  {/* USER */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[#2869df]">
                        <UserRound size={17} />
                      </div>

                      <span className="text-[12px] font-semibold text-[#243b5a]">
                        {user.name}
                      </span>

                    </div>

                  </td>

                  {/* EMAIL */}
                  <td className="px-5 py-4 text-[11px] text-[#718096]">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td className="px-5 py-4">

                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-[#2869df]">
                      {user.role}
                    </span>

                  </td>

                  {/* STATUS */}
                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {user.status}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-4">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() =>
                          openEditModal(user)
                        }
                        className="rounded-lg p-2 text-[#64748b] hover:bg-blue-50 hover:text-[#2869df]"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(user.id)
                        }
                        className="rounded-lg p-2 text-[#64748b] hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

              {/* EMPTY */}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-[12px] text-[#718096]"
                  >
                    No users found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-[480px] rounded-xl bg-white shadow-xl">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#e8edf3] px-5 py-4">

              <h2 className="text-[16px] font-semibold text-[#102b52]">
                {editingUser
                  ? "Edit User"
                  : "Add User"}
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

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-5"
            >

              {/* NAME */}
              <div>

                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Name
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
                  placeholder="Enter user name"
                />

              </div>

              {/* EMAIL */}
              <div>

                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
                  placeholder="Enter email"
                />

              </div>

              {/* ROLE */}
              <div>

                <label className="mb-1.5 block text-[11px] font-medium text-[#4a5b72]">
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value,
                    })
                  }
                  className="h-10 w-full rounded-lg border border-[#dfe5ec] px-3 text-[12px] outline-none focus:border-[#2869df]"
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Agent</option>
                  <option>Staff</option>
                </select>

              </div>

              {/* STATUS */}
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

              {/* BUTTONS */}
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
                  {editingUser
                    ? "Update User"
                    : "Create User"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Users;