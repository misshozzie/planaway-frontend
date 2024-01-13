// custom hooks:
import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:3000";

export function getAllTrips() {
  //
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  async function getData(username) {
    const fullURL = `${BASE_URL}/${username}/trips`;
    // console.log(`fullURL:${fullURL}`);
    setIsLoading(true);

    const res = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, --> to update: need this later
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      //   localStorage.setItem("token", json.token); --> to update: need this later
      setData(json);
      setIsLoading(false);
    }
  }

  return { getData, data, isLoading, error };
}
