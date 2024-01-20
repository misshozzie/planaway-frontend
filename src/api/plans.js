import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:3000";

export function getOneCard() {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  async function getData(planID) {
    const fullURL = `${BASE_URL}/plans/${planID}`;
    setIsLoading(true);
    console.log(fullURL);
    console.log("LOADING")

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

export async function updatePlan(formData) {
  const planID = '65a2150f1fa39ad1cecd3a3a';
  const fullURL = `${BASE_URL}/plans/${planID}`;

  const sendData = {
    destination: formData.destination,
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
