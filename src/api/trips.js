// custom hooks:
import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:3000";

export function getAllTrips() {
  //
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  async function getData(username) {
    const fullURL = `${BASE_URL}/trips/all/${username}`;
    // console.log(`fullURL:${fullURL}`);
    setIsLoading(true);

    const res = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, --> to update: need this later
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
      setIsLoading(false);
    }
  }

  return { getData, data, isLoading, error };
}

export function createOneTrip() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  async function postData(username, body) {
    setIsLoading(true);
    const fullURL = `${BASE_URL}/trips/${username}`;
    // console.log(body);

    const res = await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, --> to update: need this later
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      setResponse(json);
      setIsLoading(false);
    }
  }

  return { postData, response, isLoading, error };
}

export function deleteOneTrip() {
  const [deleteError, setDeleteError] = useState(null);
  const [isdeleteLoading, setDeleteIsLoading] = useState(null);
  const [dataDeleted, setDataDeleted] = useState(null);

  async function deleteData(username, tripid) {
    setDeleteIsLoading(true);
    const fullURL = `${BASE_URL}/trips/${username}?tripid=${tripid}`;

    const res = await fetch(fullURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, --> to update: need this later
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setDeleteError(json.error);
    }
    if (res.ok) {
      setDataDeleted(json);
      setDeleteIsLoading(false);
    }
  }

  return { deleteData, dataDeleted, isdeleteLoading, deleteError };
}

export function getOneTrip() {
  //
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({});

  async function getOneData(username, tripid) {
    const fullURL = `${BASE_URL}/trips/one/${username}?tripid=${tripid}`;
    // console.log(`fullURL:${fullURL}`);
    setIsLoading(true);

    const res = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, --> to update: need this later
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
      // console.log("json:");
      // console.log(json[0]);
      setIsLoading(false);
    }
  }

  return { getOneData, data, isLoading, error };
}

export function updateOneTrip() {
  //
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({});

  async function updateOneData(username, tripid, body) {
    const fullURL = `${BASE_URL}/trips/${username}?tripid=${tripid}`;
    // console.log(`fullURL:${fullURL}`);
    setIsLoading(true);

    const res = await fetch(fullURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, --> to update: need this later
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      //   localStorage.setItem("token", json.token); --> to update: need this later
      // setData(json[0]);
      // console.log("json:");
      // console.log(json[0]);
      setIsLoading(false);
    }
  }

  return { updateOneData, data, isLoading, error };
}
