import ToursPageComponent from "@/components/ToursPageComponent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ToursPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tours", ""], // to mimic the query of the component we pass empty as the second parameter
    queryFn: () => getAllTours(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursPageComponent />
    </HydrationBoundary>
  );
};
export default ToursPage;
