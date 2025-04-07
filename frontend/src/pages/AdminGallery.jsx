import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2, ImagePlus, X } from "lucide-react";
import "../styles/extra.css"
const API_URL = import.meta.env.VITE_SERVER_URL;

const AdminGallery = () => {
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [preview, setPreview] = useState(null);
    const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
const [confirmVisible, setConfirmVisible] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);
    useEffect(() => {
        if (statusMessage.text) {
          const timer = setTimeout(() => {
            setStatusMessage({ type: "", text: "" });
          }, 4000); // Disparaît après 4 secondes
      
          return () => clearTimeout(timer); // Nettoyage
        }
      }, [statusMessage]);
      
    const fetchImages = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/images`);
            setImages(res.data);
        } catch (err) {
            console.error("Fehler beim Laden der Bilder:", err);
        }
    };

    const handleUpload = async () => {
        if (!file) {
          setStatusMessage({ type: "error", text: "Bitte wählen Sie ein Bild aus." });
          return;
        }
      
        if (file.size > 10 * 1024 * 1024) {
          setStatusMessage({ type: "error", text: "Bild zu groß (max. 10 MB erlaubt)" });
          return;
        }
      
        const formData = new FormData();
        formData.append("image", file);
        formData.append("description", description);
      
        try {
          await axios.post(`${API_URL}/api/images/upload`, formData);
          setFile(null);
          setDescription("");
          setPreview(null);
          fetchImages();
          setStatusMessage({ type: "success", text: "Bild erfolgreich hochgeladen!" });
        } catch (err) {
          const errorMsg = err.response?.data?.message || "Fehler beim Hochladen";
          setStatusMessage({ type: "error", text: errorMsg });
        }
      };
      

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/images/${id}`);
            fetchImages();
        } catch (err) {
            console.error("Fehler beim Löschen:", err);
            alert("Fehler beim Löschen");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                    AdminGalerie
                </h2>

                <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 items-start mb-10">
                    {/* Spalte 1: Bild Upload und Vorschau */}
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-dark border border-forest-green text-white font-medium rounded-full cursor-pointer shadow-sm hover:bg-forest-green transition text-sm w-full text-center animate-bounce-on-hover">
                            <ImagePlus className="w-5 h-5 text-white" />
                            <span>Bild auswählen</span>
                            <input
                                type="file"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    setPreview(URL.createObjectURL(e.target.files[0]));
                                }}
                                className="hidden"
                            />
                        </label>

                        {preview && (
                            <div className="relative mt-4 w-full">
                                <img
                                    src={preview}
                                    alt="Vorschau"
                                    className="w-full max-h-100 object-cover rounded-xl shadow"
                                />
                                <button
                                    onClick={() => {
                                        setFile(null);
                                        setPreview(null);
                                    }}
                                    className="absolute top-2 right-2 bg-caramel hover:bg-chocolate text-white rounded-full p-1 shadow-md cursor-pointer"
                                    title="Vorschau löschen"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        )}

                    </div>

                    {/* Spalte 2: Beschreibung + Button */}
                    <div className="flex-1 w-full flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Bildbeschreibung..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-[var(--teal-dark)] focus:border-[var(--teal-dark)] focus:ring-2 focus:ring-[var(--teal-dark)] rounded-xl px-4 py-2 text-gray font-spectral focus:outline-none"

                        />

                        <button
                            onClick={handleUpload}
                            className="self-start bg-caramel hover:bg-chocolate text-off-white px-6 py-3 rounded-full flex items-center gap-2 font-haute-couture shadow-lg animate-bounce-on-hover transition"
                        >
                            <Plus size={20} /> Hochladen
                        </button>
                        {statusMessage.text && (
  <div
    className={`px-4 py-2 rounded-xl text-sm font-medium d transition ${
      statusMessage.type === "error"
        ? "text-red-700"
        : "text-green-700"
    }`}
  >
    {statusMessage.text}
  </div>
)}

                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Vorschau</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Beschreibung</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Aktion</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {images.map((img) => (
                                <tr key={img._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img
                                            src={img.url}
                                            alt="preview"
                                            className="w-32 h-24 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{img.description}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => {
                                                setConfirmDeleteId(img._id);
                                                setConfirmVisible(true);
                                              }}
                                            className="text-red-600 hover:text-red-800"
                                            title="Löschen"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {images.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="px-6 py-6 text-center text-gray-400">
                                        Keine Bilder vorhanden.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {confirmVisible && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Bist du sicher?</h3>
      <p className="text-sm text-gray-600 mb-6">
        Möchten Sie dieses Bild wirklich löschen?
      </p>
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={async () => {
            await handleDelete(confirmDeleteId);
            setConfirmVisible(false);
            setConfirmDeleteId(null);
          }}
        >
          Ja, löschen
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          onClick={() => {
            setConfirmVisible(false);
            setConfirmDeleteId(null);
          }}
        >
          Abbrechen
        </button>
      </div>
    </div>
  </div>
)}

        </div>
        
    );
};

export default AdminGallery;
