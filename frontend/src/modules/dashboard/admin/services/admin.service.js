import API from "../../../api";

export const getAdminUsers = () => {
  return API.get("/auth/admin/users");
};

export const updateAdminUserRole = (userId, data) => {
  return API.patch(`/auth/admin/users/${userId}/role`, data);
};
