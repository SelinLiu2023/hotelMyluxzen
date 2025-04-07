import { useEffect, useState } from "react";

export function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/reviews/admin`;

    fetch(url)
      .then((res) => res.json())
      .then(setReviews);
  }, []);
  const updateReview = (id, isApproved) => {
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/api/reviews/admin/update/${id}`;

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved }),
    }).then(() => setReviews(reviews.filter((r) => r._id !== id)));
  };

  const handleReject = async (id) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/api/reviews/${id}`;

    await fetch(url, {
      method: "DELETE",
    });
    setReviews(reviews.filter((r) => r._id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Review Page</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full"
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  <strong>Name:</strong> {review.name}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {review.email}
                </p>
                <p className="text-gray-700 mt-2  overflow-y-auto break-words">
                  {review.comment}
                </p>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => updateReview(review._id, true)}
                  className=" flex items-center justify-center gap-2 px-4 py-2 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm  text-center animate-bounce-on-hover"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(review._id)}
                  className=" flex items-center justify-center gap-2 px-4 py-2 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm  text-center animate-bounce-on-hover"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Keine Bewertungen gefunden.
          </p>
        )}
      </div>
    </div>
  );
}
