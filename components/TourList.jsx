import TourCard from "./TourCard";

const TourList = ({ data }) => {
  // console.log({ data });

  if (data.length === 0) {
    return <div className="text-base-content text-lg">No tours found...</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((tour) => {
        return <TourCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
};
export default TourList;
