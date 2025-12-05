const API_URL = "http://localhost:5000/api";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `API request failed with status ${res.status}`);
  }
  return data;
}

// --- User endpoints ---

export async function registerUser({ name, email, password }) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function updateUser(id, userData, token) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
}

export async function deleteUser(id, token) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}

// --- Review endpoints ---

export async function getReviews() {
  const res = await fetch(`${API_URL}/reviews`);
  return handleResponse(res);
}

export async function addReview({ title, content }, token) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  return handleResponse(res);
}

export async function updateReview(id, { title, content }, token) {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  return handleResponse(res);
}

export async function deleteReview(id, token) {
  const res = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
}