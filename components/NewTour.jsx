"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExistingTour,
  createNewTour,
  generateTourResponse,
} from "@/utils/actions";
import TourInfo from "./TourInfo";
import toast from "react-hot-toast";

/**
 * The reason we are calling 3 separate functions (getExistingTour / generateTourResponse / createNewTour)
 * instead of just one is because Vercel has a 10 second timeout for serverless functions.
 * If we were to call all 3 functions in one go, we would exceed the timeout limit and the function
 * would fail. By calling the functions separately, we (try to) make sure that the
 * function does not exceed the timeout limit.
 * @returns newTour
 */
const NewTour = () => {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      // first check if the tour already exists, is so, return it
      const existingTour = await getExistingTour(destination);
      if (existingTour) {
        return existingTour;
      }

      // if not, generate a new tour
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        // if the tour is generated, create a new tour in the database
        await createNewTour(newTour);
        // invalidate the tours query to refetch the data
        queryClient.invalidateQueries({ queryKey: ["tours"] });

        return newTour;
      }
      // if no tour is generated, return null
      toast.error("No matching destination found...");
      return null;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log(destination);
    mutate(destination);
  };

  if (isPending) {
    return <span className="loading loading-lg">...</span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="text-base-content max-w-2xl">
        <h2 className="mb-4">Create a new tour</h2>
        <div className="join w-full">
          <input
            type="text"
            placeholder="city"
            name="city"
            className="input input-bordered join-item w-full"
            required
          />
          <input
            type="text"
            placeholder="country"
            name="country"
            className="input input-bordered join-item w-full"
            required
          />
          <button className="btn btn-primary join-item" type="submit">
            Create tour
          </button>
        </div>
      </form>

      <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  );
};
export default NewTour;
