import Link from "next/link";
import { redirect } from "next/navigation";
import TourInfo from "@/components/TourInfo";
import { getTourById, generateTourImage } from "@/utils/actions";
import Image from "next/image";
import axios from "axios";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  const tour = await getTourById(params.id);

  if (!tour) {
    redirect("/tours");
  }

  const { data } = await axios.get(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  // Getting the image from OpenAI (Too expensive and results are not good enough)
  // const tourImage = await generateTourImage({
  //   city: tour.city,
  //   country: tour.country,
  // });

  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        Back to tours
      </Link>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={384}
            height={256}
            className="rounded-xl shadow-xl mb-16 h-64 w-96 object-cover"
            alt={tour.title}
            prioruty
          />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;
