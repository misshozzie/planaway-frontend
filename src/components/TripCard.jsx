export default function TripCard({
  destination,
  startDay,
  endDay,
  description,
}) {
  return (
    <>
      <p>{destination}</p>
      <p>{startDay}</p>
      <p>{endDay}</p>
      <p>{description}</p>
    </>
  );
}
