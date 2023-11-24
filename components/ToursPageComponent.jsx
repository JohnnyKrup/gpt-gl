"use client";

import { useState } from "react";
import { getAllTours } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import TourList from "./TourList";

/**
 * Why do we need to use useQuery here?
 * We have useQery already in the tours/page.js file, why do we need to use it again here?
 * There will be a search bar in the future, and we will need to refetch the data when the user
 * types in the search bar. We can't do that in the tours/page.js file because that file is
 * only rendered once when the page loads.
 *
 * Because the queries are cached by default in react-query, we also have to pass the search term
 * as a query key so that react-query knows that we are fetching different data.
 * @returns
 */
const ToursPageComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tours", searchTerm], // searchTerm triggers the refetch
    queryFn: () => getAllTours(searchTerm),
  });

  // console.log({ data });

  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Enter city or country here..."
            className="input input-bordered join-item w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchTerm("")}
          >
            {isPending ? "Please wait..." : "Reset"}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className="loading loading-lg">...</span>
      ) : (
        <TourList data={data} />
      )}
    </>
  );
};

export default ToursPageComponent;
