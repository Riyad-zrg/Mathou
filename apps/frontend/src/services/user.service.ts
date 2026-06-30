const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

export async function getUserById(id: number) {
  const url = `${serverUrl}/users/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(error.message);
  }
}
