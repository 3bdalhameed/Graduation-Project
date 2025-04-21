const BASE_URL = "http://127.0.0.1:8000/api/learning-materials/";

export const fetchMaterials = async (token) => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch materials");
  return res.json();
};

export const createMaterial = async (payload, token) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create material");
  return res.json();
};

export const updateMaterial = async (id, payload, token) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update material");
  return res.json();
};

export const deleteMaterial = async (id, token) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete material");
};
