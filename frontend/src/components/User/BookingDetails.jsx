import { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import { motion } from "framer-motion";

const BookingDetails = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [view, setView] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 4;
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const bookingContainerRef = useRef(null);

  useEffect(() => { 
    if (!user) {
      setError(" Nicht eingeloggt! Bitte melden Sie sich an.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/auth/my-bookings`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const upcoming = data
          .filter((b) => b.status !== "Canceled" && new Date(b.startDate) >= now)
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        const past = data
          .filter((b) => b.status === "Canceled" || new Date(b.startDate) < now)
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setBookings([...upcoming, ...past]);
        setLoading(false);
      })
      .catch((err) => {
        setError("Fehler beim Laden der Buchungen.");
        setLoading(false);
      });
  }, [user]);

  const filteredBookings = bookings.filter((booking) => {
    if (view === "canceled") return booking.status === "Canceled";
    if (view === "active") return booking.status !== "Canceled" && booking.status !== "CheckedOut";

    return true;
  });

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [view, filteredBookings.length]);

  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );


  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowConfirm(true);
  };

  const handleCancelNo = () => {
    setShowConfirm(false);
    setSelectedBooking(null);
  };

  const handleCancelYes = async () => {
    if (!selectedBooking) return;

    try {
      const requestBody = {
        houseNum: selectedBooking.houseNum,
        status: "Canceled",
        email: selectedBooking.email // add email for cancel email
      };

      const response = await fetch(
        `${API_URL}/booking/cancel-or-checkout/${selectedBooking.bookingNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) throw new Error("❌ Fehler beim Stornieren der Buchung.");

      setBookings((prev) =>
        prev.map((booking) =>
          booking.bookingNumber === selectedBooking.bookingNumber
            ? { ...booking, status: "Canceled" }
            : booking  
        )
      );

      setShowConfirm(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("❌ Fehler beim Stornieren:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("de-DE", options);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2
        className="text-4xl font-semibold mb-10 mt-5 text-[#0e5756] text-center"
        style={{ fontFamily: "Merriweather, serif" }}
      >
        Ihre Buchungen
      </h2>

  {/* Ladezustand */}
  {loading ? (
        <p className="text-gray-600 text-center">⏳ Lade Buchungen...</p>
      ) : bookings.length === 0 ? (
        <div className="p-10 bg-[#f8f9fa] text-center rounded-2xl shadow-md border border-gray-200 max-w-2xl mx-auto mt-10">
  <h3 className="text-xl font-semibold text-[#0e5756]" style={{ fontFamily: "Merriweather, serif" }}>
    Du hast noch keine Buchungen
  </h3>
  <p className="text-gray-600 mt-2 mb-6" style={{ fontFamily: "Merriweather, serif" }}>
  Aber du kannst jetzt ganz einfach deine Traumvilla bei uns buchen.
  </p>
  <button
    className="inline-block px-6 py-3 bg-[#116769] text-white rounded-md  pointer-cursor font-medium shadow-md hover:bg-[#0e5756] transition duration-300"
    style={{ fontFamily: "Merriweather, serif" }}
    onClick={() => window.location.href = "/booking"}
  >
    Unterkunft buchen
  </button> 
</div>
      ) : (
        <>
          {/* Filterbuttons */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex shadow-md rounded-md overflow-hidden border border-gray-300">
              {['all', 'active', 'canceled'].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 transition-all duration-200 ${
                    view === type
                      ? "bg-[#116769] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setView(type);
                    setCurrentPage(1);
                  }}
                  style={{ fontFamily: "Merriweather, serif" }}
                >
                  {type === "all" ? "Alle" : type === "active" ? "Aktiv" : "Storniert"}
                </button>
              ))}
            </div>
          </div>
        <div ref={bookingContainerRef} className="space-y-6">
          {currentBookings.map((booking) => (
            <div
              key={booking.bookingNumber}
              className="p-6 bg-white shadow-lg border-gray-200 rounded-none mb-6"
            >
              <div>
                <p className="font-medium text-gray-600" >
                  <strong>Buchungsnummer:</strong> {booking.bookingNumber}
                </p>
                <p className="text-gray-600" >
                  <strong>Unterkunft:</strong> {booking.houseTitle}
                </p>
                <p className="text-gray-600" >
                  <strong>Gästeanzahl:</strong> {booking.guestCount}
                </p>
                <p className="text-gray-600" >
                  <strong>Tagen:</strong> {booking.totalDays}
                </p>
                <p className="text-gray-600" >
                  <strong>Startdatum:</strong> {formatDate(booking.startDate)}
                </p>
                <p className="text-gray-600" >
                  <strong>Enddatum:</strong> {formatDate(booking.endDate)}
                </p>
                <p className="text-gray-600" >
                  <strong>Preis pro Nacht:</strong> {booking.price} €
                </p>
                <p className="text-gray-600" >
                  <strong>Gesamtpreis:</strong> {booking.totalPrice} €
                </p>
                <p className="text-gray-600" >
                  <strong>Status:</strong> {booking.status}
                </p>
              </div>

              {booking.status !== "Canceled" && booking.status !== "CheckedOut" && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCancelClick(booking)}
                    className="px-4 py-2 bg-[#116769] text-white border border-[#0e5756] rounded-md hover:bg-[#0e5756] transition duration-200"
                  >
                    Stornieren
                  </button>
                </div>
              )}

              {booking.status === "Canceled" && (
                <div className="mt-4 p-2 bg-[#e6f2f1] text-[#0e5756] rounded-md" >
                  <p className="font-bold">Sie haben diese Buchung storniert.</p>
                </div>
              )}
            </div>
          ))}
        </div>
        </>
      )}

      {/* Bestätigung Popup */}
      {showConfirm && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center p-5">
          <div className="bg-[#e6f2f1] p-6 rounded-xl shadow-xl border border-gray-200 max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold text-gray-700">Buchung stornieren?</h3>
            <p className="text-gray-600 mt-3">Sind Sie sicher, dass Sie die Buchung stornieren möchten?</p>
            <div className="flex justify-center mt-5 space-x-3">
              <button
                onClick={handleCancelYes}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Stornieren
              </button>
              <button
                onClick={handleCancelNo}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredBookings.length > bookingsPerPage && (
  <div className="flex justify-center items-center mt-8 gap-6">
    <button
      onClick={() => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        window.scrollTo(0, 0);
      }}
      disabled={currentPage === 1}
      className="text-2xl px-4 py-2 rounded-md bg-white shadow hover:bg-gray-100 transition duration-200 disabled:opacity-40  cursor-pointer"
    >
      ‹
    </button>

    <span className="text-lg text-gray-700 font-medium">
      Seite {currentPage} von {totalPages}
    </span>

    <button
      onClick={() => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        window.scrollTo(0, 0);
      }}
      disabled={currentPage === totalPages}
      className="text-2xl px-4 py-2 rounded-md bg-white shadow hover:bg-gray-100 transition duration-200 disabled:opacity-40  cursor-pointer"
    >
      ›
    </button>
  </div>
)}


    </div>
  );
};

export default BookingDetails;
