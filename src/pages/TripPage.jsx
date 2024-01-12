//To display trips under a single user
import { useParams } from "react-router";
import { getAllTrips } from "../api/trips";
import { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import { formatDate } from "../util/helperFunc";

export default function TripPage() {
  const [tripData, setTripData] = useState([]);
  let username = useParams().username;

  //to update: dependency might need to change
  useEffect(() => {
    getAllTrips(username, setTripData);
  }, [username]);
  console.log(`tripData:${JSON.stringify(tripData)}`);
  return (
    <>
      {tripData.map((trip) => (
        <TripCard
          destination={trip.destination}
          startDay={formatDate(trip.startDay)}
          endDay={formatDate(trip.endDay)}
          description={trip.description}
          key={trip._id}
        />
      ))}
    </>
  );
}
