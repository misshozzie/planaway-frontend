//To display trips under a single user
// import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { getAllTrips } from "../api/trips";
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import { formatDate } from "../util/helperFunc";

export default function TripPage() {
  const navigate = useNavigate();
  const { getData, data, isLoading, error } = getAllTrips();
  // to get the query params in url
  let query = new URLSearchParams(window.location.search);
  let username = query.get("username");

  //to update: dependency might need to change
  useEffect(() => {
    async function fetch() {
      await getData(username);
    }
    fetch();
  }, [username]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // console.log(`tripData:${JSON.stringify(tripData)}`);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => navigate(`/user/trips/new?username=${username}`)}
      >
        Create New Trip
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        data.map((trip) => (
          <TripCard
            destination={trip.destination}
            startDay={formatDate(trip.startDay)}
            endDay={formatDate(trip.endDay)}
            description={trip.description}
            key={trip._id}
            tripId={trip._id}
          />
        ))
      )}
    </>
  );
}
