import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:3000";

export function getOneCard() {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  async function getData(planID) {
    const fullURL = `${BASE_URL}/plans/${planID}`;
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
      console.log(json)
      setIsLoading(false);
    }
  }

  return { getData, data, isLoading, error };
}

export async function createPlan(formData, tripid) {
  const tripID = tripid;
  const fullURL = `${BASE_URL}/plans/${tripID}`;


  const sendData = {
    header: formData.header,
    description: formData.description,
    tripID: tripID, 
  };

  const res = await fetch(fullURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, --> to update: need this later
    },
    body: JSON.stringify(sendData),
  });

  const json = await res.json();

  if (!res.ok) {
    return { error: json.error };
  }
  return { error: null };
}

export async function updatePlan(formData, planid) {
  const planID = planid
  const fullURL = `${BASE_URL}/plans/${planID}`;

  const sendData = {
    header: formData.header,
    description: formData.description,
  };

  const res = await fetch(fullURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, --> to update: need this later
    },
    body: JSON.stringify(sendData),
  });

  const json = await res.json();

  if (!res.ok) {
    return { error: json.error };
  }
  return { error: null };
}

export async function showPlans(tripid) {

  const tripID = tripid;
  const fullURL = `${BASE_URL}/plans/${tripID}`;

  const res = await fetch(fullURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`, --> to update: need this later
    },
  });

  const json = await res.json();
  const jsonArray = Object.values(json);
 

  if (!res.ok) {
    return { error: json.error, data: null };
  }

  return { error: null, data: jsonArray };
}

export function deleteOnePlan() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  async function deleteData(planid) {
    setIsLoading(true);
    const fullURL = `${BASE_URL}/plans/${planid}`;

    try {
      const res = await fetch(fullURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, --> to update: need this later
        },
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error);
      } else {
        setData(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { deleteData, data, isLoading, error };
}
