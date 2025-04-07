//zahra

import React, { useState, useEffect } from "react";
import SuccessPopup from "./SuccessPopup";
import "../../styles/extra.css";

const API_URL = import.meta.env.VITE_SERVER_URL;

const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            name: `${data.vorname || ""} ${data.nachname || ""}`.trim(),
            email: data.email || "",
          }));
        }
      } catch (err) {
        console.warn("Aucun utilisateur connecté (ou erreur serveur)");
      } finally {
        setUserLoaded(true);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-[90%] max-w-lg shadow-xl text-teal-dark relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-xl">
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">Kontaktieren Sie uns</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {userLoaded && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail-Adresse"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </>
            )}

            <textarea
              name="message"
              placeholder="Ihre Nachricht"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-teal-dark text-white px-4 py-2 rounded hover:bg-teal-light"
            >
              Senden
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <SuccessPopup
          message="Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet."
          onClose={handleCloseSuccess}
        />
      )}
    </>
  );
};

export default ContactFormModal;
