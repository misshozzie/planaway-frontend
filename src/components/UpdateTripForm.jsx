import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getOneTrip, updateOneTrip } from "../api/trips";
import { formatDate } from "../util/helperFunc";

export default function UpdateTripForm() {
  const [formState, setFormState] = useState({
    destination: null,
    description: null,
    startDay: null,
    endDay: null,
  });
  const [disabled, setDisabled] = useState(true);
  const { getOneData, data, isLoading, error } = getOneTrip();
  const { updateOneData, updateData, isUpdateLoading, updateError } =
    updateOneTrip();
  const navigate = useNavigate();

  let query = new URLSearchParams(window.location.search);
  let username = query.get("username");
  let tripId = query.get("tripid");

  useEffect(() => {
    async function fetch() {
      await getOneData(username, tripId);
    }
    fetch();
  }, [tripId]);

  // console.log("data");
  // console.log(data);
  console.log("formData:");
  console.log(formState);

  useEffect(() => {
    const initialData = {
      destination: data.destination,
      description: data.description,
      startDay: formatDate(data.startDay),
      endDay: formatDate(data.endDay),
    };
    setFormState(initialData);
  }, [data]);

  function validate() {
    if (formState.startDay >= formState.endDay) {
      return true;
    } else {
      return false;
    }
  }

  function handleChange(evt) {
    let currentForm = { ...formState };
    currentForm[evt.target.name] = evt.target.value;
    setDisabled(validate());
    setFormState(currentForm);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log(formState);
    async function fetch() {
      await updateOneData(username, tripId, formState);
    }
    fetch();
    navigate(`/user/trips?username=${username}`);
  }

  return (
    <>
      {isLoading || formState.destination == null ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              onChange={handleChange}
              value={formState.destination}
              // required
            />
            <label>Start Day</label>
            <input
              type="date"
              name="startDay"
              onChange={handleChange}
              value={formState.startDay}
              required
            />
            <label>End Day</label>
            <input
              type="date"
              name="endDay"
              onChange={handleChange}
              value={formState.endDay}
              required
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
            <button type="submit" disabled={disabled}>
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}
