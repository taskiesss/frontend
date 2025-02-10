"use server";

export async function fetchSuggestionsServer(search: string) {
  try {
    const response = await fetch(
      `https://api.example.com/skills/suggest?q=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SKILLS_API_KEY}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
