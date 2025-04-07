import { useState } from "react";
import { ReviewList } from "../components/review/ReviewList";
import { ReviewForm } from "../components/review/ReviewForm";
import MiniNavbar from "../components/navbarMini/NavbarMini";
import Footer from "../components/footer/Footer";
export function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addReview = (review) => {
    setReviews([review, ...reviews]);
    setShowModal(false);
  };

  return (
    <div>
      {!showModal && <MiniNavbar />}
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2  bg-neutral-400 text-white rounded-md hover:bg-[#064236] mt-4 mr-5  float-right"
        >
          Add review
        </button>
        {showModal && (
          <div
            className="fixed inset-0 flex justify-center items-center p-4 z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white p-6 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <ReviewForm onReviewAdded={addReview} />
            </div>
          </div>
        )}
        <ReviewList reviews={reviews} />
      </div>
      <Footer />
    </div>
  );
}
