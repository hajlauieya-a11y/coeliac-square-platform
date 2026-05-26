import API from "../../../api";

export const getPublishedExpertContent = () => {
  return API.get("/expert/contents");
};

export const getMyExpertContent = () => {
  return API.get("/expert/contents/mine");
};

export const createExpertContent = (contentData) => {
  return API.post("/expert/contents", contentData);
};

export const updateExpertContent = (id, contentData) => {
  return API.patch(`/expert/contents/${id}`, contentData);
};

export const deleteExpertContent = (id) => {
  return API.delete(`/expert/contents/${id}`);
};

export const getExpertProfile = () => {
  return API.get("/expert/profile");
};

export const updateExpertProfile = (profileData) => {
  return API.patch("/expert/profile", profileData);
};
