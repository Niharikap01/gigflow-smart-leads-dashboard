import api from "./axios";

export const getLeads = async (
  token: string,
  query = ""
) => {
  const res = await api.get(
    `/leads${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const createLead = async (
  token: string,
  leadData: any
) => {
  const res = await api.post(
    "/leads",
    leadData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateLead = async (
  token: string,
  id: string,
  leadData: any
) => {
  const res = await api.put(
    `/leads/${id}`,
    leadData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const deleteLead = async (
  token: string,
  id: string
) => {
  const res = await api.delete(
    `/leads/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};