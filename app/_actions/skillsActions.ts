"use server";

export async function fetchSuggestionsServer(query: string) {
  if (!query.trim()) return [];

  const key = process.env.SKILLS_API_KEY;
  if (!key) throw new Error("Missing API key");

  try {
    const response = await fetch(
      `https://api.apilayer.com/skills?q=${encodeURIComponent(query)}`,
      {
        headers: { apikey: key },
        method: "GET",
        redirect: "follow",
      }
    );
    const result = await response.json();
    return result || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
