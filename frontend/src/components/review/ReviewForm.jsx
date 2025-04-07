import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";

export function ReviewForm({ onReviewAdded, onClose }) {
  const [review, setReview] = useState({
    name: "",
    email: "",
    rating: 0, // Anfangswert auf 0 setzen
    month: "January", // Standardmonat
    year: new Date().getFullYear(), // Standardjahr
    guestType: "Guest",
    title: "",
    comment: "",
  });
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setReview((prevReview) => ({
        ...prevReview,
        name: `${user.vorname ?? ""} ${user.nachname ?? ""}`.trim(),
        email: user.email || "",
      }));
    }
  }, [user]);
  console.log("Benutzerdaten aus useContext:", user);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!review.name.trim())
      newErrors.name = "Bitte geben Sie Ihren Namen ein.";
    if (!review.email.trim())
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    if (!review.rating)
      newErrors.rating = "Bitte wählen Sie eine Bewertung aus.";
    if (!review.title.trim())
      newErrors.title = "Bitte geben Sie einen Titel für Ihre Bewertung ein.";
    if (!review.comment.trim())
      newErrors.comment = "Bitte geben Sie einen Kommentar ein.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const url = `${import.meta.env.VITE_SERVER_URL}/api/reviews/add`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      setSuccess(true);
      onReviewAdded(); // Optional: Diese Funktion sorgt dafür, dass nach erfolgreichem Hinzufügen die Liste der Reviews neu geladen wird.
      setReview({
        name: user ? `${user.vorname ?? ""} ${user.nachname ?? ""}`.trim() : "",
        email: user ? user.email : "",
        rating: 0,
        month: "January",
        year: new Date().getFullYear(),
        guestType: "Guest",
        title: "",
        comment: "",
      });
    } else {
      console.error("Fehler beim Senden der Bewertung:", response.statusText);
    }
  };

  const handleRatingChange = (value) => {
    setReview({ ...review, rating: value });
    setErrors((prevErrors) => ({ ...prevErrors, rating: "" }));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative p-6 bg-white shadow rounded-lg w-500 max-w-lg mx-auto">
        {success && (
          <div className="bg-green-500 text-white p-2 mb-4">
            Your review request was sent successfully!
          </div>
        )}
        {/* Rating: Sterne */}
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">Rating</h3>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <div
                key={r}
                className={`cursor-pointer text-2xl ${
                  review.rating >= r ? "text-[#a98162]" : "text-gray-300"
                } hover:text-[#a98162]`}
                onClick={() => handleRatingChange(r)}
              >
                ★
              </div>
            ))}
          </div>
          {errors.rating && (
            <p className="text-[#9C785E] text-sm mt-2">{errors.rating}</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              name="name"
              onChange={handleChange}
              value={review.name}
              placeholder="Name"
              className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
            />
            {errors.name && (
              <p className="text-[#9C785E] text-sm mt-2">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              name="email"
              onChange={handleChange}
              value={review.email}
              placeholder="Email"
              className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
            />
            {errors.email && (
              <p className="text-[#9C785E] text-sm mt-2">{errors.email}</p>
            )}
          </div>
          {/* Monat-Auswahl */}
          <select
            name="month"
            value={review.month}
            onChange={handleChange}
            className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
          >
            <option value="" disabled>
              Select a month
            </option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          {/* Jahr-Auswahl */}
          <select
            name="year"
            value={review.year}
            onChange={handleChange}
            className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
          >
            <option value="" disabled>
              Select a year
            </option>
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div>
            <input
              name="title"
              onChange={handleChange}
              value={review.title}
              placeholder="Review Title"
              className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
            />
            {errors.title && (
              <p className="text-[#9C785E] text-sm mt-2">{errors.title}</p>
            )}
          </div>
          <div>
            <textarea
              name="comment"
              onChange={handleChange}
              value={review.comment}
              placeholder="Your comment"
              className="w-full bg-gray-50 p-3 rounded-md border border-gray-300 mt-2"
            />
            {errors.comment && (
              <p className="text-[#9C785E] text-sm mt-2">{errors.comment}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-neutral-400 text-white rounded-md hover:bg-[#064236] mt-4"
          >
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
}
