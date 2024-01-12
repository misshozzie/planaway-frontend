//tbc not quite sure about this part....

const BASE_URL = "http://localhost:3000";

export async function getAllTrips(username, setter) {
  const fullURL = `${BASE_URL}/${username}/trips`;
  console.log(`fullURL:${fullURL}`);

  const res = await fetch(fullURL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    setter(data);
  } else {
    throw new Error("Failed to fetch trips");
  }
}
