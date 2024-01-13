import { deleteOneTrip } from "../api/trips";

export default function TripCard({
  destination,
  startDay,
  endDay,
  description,
  tripId,
}) {
  const { deleteData, data, isLoading, error } = deleteOneTrip();
  let query = new URLSearchParams(window.location.search);
  // console.log(`query:${query}`);
  let username = query.get("username");

  function handleDelete() {
    async function fetch() {
      await deleteData(username, tripId);
    }
    fetch();
  }

  return (
    <>
      <p>{destination}</p>
      <p>{startDay}</p>
      <p>{endDay}</p>
      <p>{description}</p>
      <button
        type="button"
        // onClick={() => navigate("placeholder for plan page")}
      >
        View
      </button>
      <button
        type="button"
        // onClick={() => navigate("placeholder for plan page")}
      >
        Edit
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
