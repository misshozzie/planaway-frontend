import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export function getOneCard() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  async function getData(planID) {
    const fullURL = `${BASE_URL}/plans/${planID}`;
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const res = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      //   localStorage.setItem("token", json.token); --> to update: need this later
      setData(json);
      console.log(json);
      setIsLoading(false);
    }
  }

  return { getData, data, isLoading, error };
}

export async function createPlan(formData, tripid) {
  const tripID = tripid;
  const fullURL = `${BASE_URL}/plans/${tripID}`;
  const token = localStorage.getItem("token");

  const sendData = {
    header: formData.header,
    description: formData.description,
    tripID: tripID,
  };

  const res = await fetch(fullURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  const planID = planid;
  const fullURL = `${BASE_URL}/plans/${planID}`;
  const token = localStorage.getItem("token");

  const sendData = {
    header: formData.header,
    description: formData.description,
  };

  const res = await fetch(fullURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  const token = localStorage.getItem("token");

  const res = await fetch(fullURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const json = await res.json();
  const jsonArray = Object.values(json);

  if (!res.ok) {
    return { error: json, data: null };
  }

  return { error: null, data: jsonArray };
}

export async function deleteOnePlan(tripid, planid) {
  const fullURL = `${BASE_URL}/plans/${tripid}`;
  const token = localStorage.getItem("token");

  const res = await fetch(fullURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ planid: planid }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error);
  }

  return json;
}

export async function getOnePlan(tripid, planid) {
  const fullURL = `${BASE_URL}/plans/${tripid}/${planid}`;
  const token = localStorage.getItem("token");

  const res = await fetch(fullURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      //Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error);
  }

  return json;
}
