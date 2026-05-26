import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminUsers, updateAdminUserRole } from "../services/admin.service";
import "../../vendor/index.css";
import "../index.css";

const roles = ["user", "vendor", "formateur", "expert", "admin"];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const pendingRequests = useMemo(
    () => users.filter((user) => user.roleRequestStatus === "pending" && user.requestedRole),
    [users]
  );

  const loadUsers = () => {
    setLoading(true);
    getAdminUsers()
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load users.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateLocalUser = (updatedUser) => {
    setUsers((prev) => prev.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
  };

  const approveRequest = async (user) => {
    try {
      const res = await updateAdminUserRole(user._id, { role: user.requestedRole });
      updateLocalUser(res.data);
      setMessage(`${user.name} is now ${user.requestedRole}.`);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not approve this role.");
    }
  };

  const rejectRequest = async (user) => {
    try {
      const res = await updateAdminUserRole(user._id, { roleRequestStatus: "rejected" });
      updateLocalUser(res.data);
      setMessage(`Role request rejected for ${user.name}.`);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not reject this request.");
    }
  };

  const changeRole = async (user, role) => {
    try {
      const res = await updateAdminUserRole(user._id, { role });
      updateLocalUser(res.data);
      setMessage(`${user.name} role updated to ${role}.`);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update this role.");
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-wide">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Admin Dashboard</div>
            <h1 className="dashboard-title">Users & Role Requests</h1>
            <p className="dashboard-subtitle">
              Confirm requested roles and adjust user permissions across the platform.
            </p>
          </div>

          <Link to="/admin/dashboard">
            <button className="dashboard-btn dashboard-btn-secondary">Back to Dashboard</button>
          </Link>
        </div>

        {message && <div className="dashboard-message success">{message}</div>}
        {error && <div className="dashboard-message error">{error}</div>}

        <section className="dashboard-card admin-role-section">
          <h2>Pending role requests</h2>

          {loading ? (
            <p>Loading users...</p>
          ) : pendingRequests.length === 0 ? (
            <p>No pending role requests.</p>
          ) : (
            <div className="admin-user-list">
              {pendingRequests.map((user) => (
                <article key={user._id} className="admin-user-row">
                  <div>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <div className="admin-role-tags">
                      <span>Current: {user.role}</span>
                      <span>Requested: {user.requestedRole}</span>
                    </div>
                  </div>

                  <div className="vendor-row-actions">
                    <button className="dashboard-btn dashboard-btn-primary" onClick={() => approveRequest(user)}>
                      Confirm
                    </button>
                    <button className="dashboard-btn dashboard-btn-danger" onClick={() => rejectRequest(user)}>
                      Reject
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-card admin-role-section">
          <h2>All users</h2>

          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="admin-user-list">
              {users.map((user) => (
                <article key={user._id} className="admin-user-row">
                  <div>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <div className="admin-role-tags">
                      <span>Role: {user.role}</span>
                      <span>Status: {user.roleRequestStatus}</span>
                      {user.requestedRole && <span>Requested: {user.requestedRole}</span>}
                    </div>
                  </div>

                  <select
                    className="admin-role-select"
                    value={user.role}
                    onChange={(e) => changeRole(user, e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
