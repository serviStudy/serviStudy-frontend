export const validateVerificationCode = async (
  email: string,
  code: string
) => {
  const API_URL = "/api/proxy";

  const res = await fetch(`${API_URL}/users/code/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error en la verificación");
  }

  return data;
};