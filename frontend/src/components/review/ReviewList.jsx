import { useEffect, useState } from "react";

export function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/reviews`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Nach createdAt sortieren, neueste zuerst
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sorted);
      })
      // .then(setReviews)
      .catch((error) => console.error("Fehler beim Laden der Reviews:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">
          Noch keine Bewertungen verfügbar.
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-2xl  transform transition duration-300 hover:scale-105 c mb-6  w-full max-w-6xl mx-auto p-4 sm:flex-col md:flex-row"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-xl text-gray-600">
                  {review.name}
                </span>
                <span className="text-[#a98162] text-2xl">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {review.title}
              </h3>
              <p className="text-gray-600 mt-3 leading-relaxed text-lg">
                {review.comment}
              </p>
              <small className="text-gray-500 block mt-4 text-base">
                {review.guestType} | {review.month} {review.year}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
