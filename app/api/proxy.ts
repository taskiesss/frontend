import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the token from an HTTP-only cookie named "token"
  // (Ensure your backend sets this cookie with httpOnly, secure, etc.)
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  // The backend API endpoint you want to proxy to:
  const backendUrl = "http://localhost:8080"; // Change as needed

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        // Add the Bearer token to the Authorization header
        Authorization: `Bearer ${token}`,
        // Optionally, you can forward additional headers if needed
      },
      // Only include a body for non-GET methods
      body: req.method === "GET" ? null : JSON.stringify(req.body),
    });

    // Forward the backend response back to the client
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
