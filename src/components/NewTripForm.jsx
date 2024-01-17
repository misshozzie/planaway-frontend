import { useState } from "react";
import { useNavigate } from "react-router";
import { createOneTrip } from "../api/trips";

export default function NewTripForm() {
  const [formState, setFormState] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { postData, data, isLoading, error } = createOneTrip();
  const navigate = useNavigate();

  let query = new URLSearchParams(window.location.search);
  let username = query.get("username");

  function validate() {
    if (formState.startDay > formState.endDay) {
      return true;
    } else {
      return false;
    }
  }

  function handleChange(evt) {
    let currentForm = formState;
    currentForm[evt.target.name] = evt.target.value;
    setDisabled(validate());
    setFormState(currentForm);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // console.log(formState);
    async function fetch() {
      await postData(username, formState);
    }
    fetch();
    navigate(`/user/trips?username=${username}`);
  }

  return (
    <>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            onChange={handleChange}
            required
          />
          <label>Start Day</label>
          <input type="date" name="startDay" onChange={handleChange} required />
          <label>End Day</label>
          <input type="date" name="endDay" onChange={handleChange} required />
          <label>Description</label>
          <input type="text" name="description" onChange={handleChange} />
          <button type="submit" disabled={disabled}>
            Confirm
          </button>
        </form>
      </div>
    </>
  );
}
