import API from "../../api";

export const getWorkshops = () => {
  return API.get("/workshops");
};

export const getWorkshopById = (id) => {
  return API.get(`/workshops/${id}`);
};

export const getFormateurWorkshops = () => {
  return API.get("/workshops/formateur/mine");
};

export const createWorkshop = (workshopData) => {
  return API.post("/workshops", workshopData);
};

export const updateWorkshop = (id, workshopData) => {
  return API.patch(`/workshops/${id}`, workshopData);
};

export const deleteWorkshop = (id) => {
  return API.delete(`/workshops/${id}`);
};

export const registerWorkshop = (id) => {
  return API.post(`/workshops/${id}/register`);
};

export const getMyWorkshopRegistrations = () => {
  return API.get("/workshops/my-registrations");
};

export const cancelMyWorkshopRegistration = (registrationId) => {
  return API.patch(`/workshops/my-registrations/${registrationId}/cancel`);
};

export const getWorkshopRegistrations = (id) => {
  return API.get(`/workshops/${id}/registrations`);
};
