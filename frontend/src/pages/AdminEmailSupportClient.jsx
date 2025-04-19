import React, { useEffect, useState } from "react";
import { X, Mail, Trash2 } from "lucide-react";

const API_URL = import.meta.env.VITE_SERVER_URL;

const AdminEmailSupportClient = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // new

  useEffect(() => {
    fetch(`${API_URL}/api/contact/all`,{
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMessages(data.reverse()));
  }, []);

  const filteredMessages = messages.filter((msg) => {
    if (filter === "all") return true;
    if (filter === "replied") return msg.status === "replied";
    if (filter === "pending") return msg.status !== "replied";
    return true;
  });

  const handleReplySubmit = async () => {
    if (!selectedMessage || !responseText) return;
    setLoading(true);
    await fetch(`${API_URL}/api/contact/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: selectedMessage._id,
        email: selectedMessage.email,
        responseText,
      }),
    });
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === selectedMessage._id
          ? { ...msg, status: "replied", reply: responseText }
          : msg
      )
    );
    setSelectedMessage(null);
    setResponseText("");
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Möchten Sie diese Nachricht wirklich löschen?")) return;
    try {
      await fetch(`${API_URL}/api/contact/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      alert("Fehler beim Löschen");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          Kundenanfragen
        </h2>

        {/* Filter */}
        <div className="mb-6 flex justify-center gap-4 text-sm text-gray-600">
          <button
            className={`px-4 py-1 rounded-full ${filter === "all" ? "bg-caramel text-white" : "bg-white border"}`}
            onClick={() => setFilter("all")}
          >
            Alle
          </button>
          <button
            className={`px-4 py-1 rounded-full ${filter === "pending" ? "bg-caramel text-white" : "bg-white border"}`}
            onClick={() => setFilter("pending")}
          >
            Nicht beantwortet
          </button>
          <button
            className={`px-4 py-1 rounded-full ${filter === "replied" ? "bg-caramel text-white" : "bg-white border"}`}
            onClick={() => setFilter("replied")}
          >
            Beantwortet
          </button>
        </div>

        <div className="space-y-6">
          {filteredMessages.length === 0 && (
            <p className="text-gray-500 text-center">Keine Nachrichten vorhanden.</p>
          )}

          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition relative"
            >
              <button
                onClick={() => handleDelete(msg._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                title="Löschen"
              >
                <Trash2 size={20} />
              </button>

              <div className="text-sm text-gray-500">
                {new Date(msg.createdAt).toLocaleString("de-DE")}
              </div>
              <div className="mt-2">
                <p><strong>Von:</strong> {msg.name} ({msg.email})</p>
                <p className="my-2 break-words whitespace-pre-wrap"><strong>Nachricht:</strong> {msg.message}</p>

                <p className="text-sm italic">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      msg.status === "replied" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {msg.status === "replied" ? "Beantwortet" : "Offen"}
                  </span>
                </p>
                {msg.status !== "replied" && (
                  <button
                    onClick={() => setSelectedMessage(msg)}
                    className="mt-4 bg-caramel hover:bg-chocolate text-off-white px-5 py-2 rounded-full flex items-center gap-2 font-haute-couture shadow-md animate-bounce-on-hover"
                  >
                    <Mail size={18} /> Antworten
                  </button>
                )}
                {msg.reply && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold">Gesendete Antwort:</p>
                    <div className="bg-gray-100 p-3 rounded-xl mt-1 text-gray-700">
                      {msg.reply}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Antwort Modal */}
        {selectedMessage && (
         <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50">
         <div className="absolute top-1/2 left-[calc(50%+40px)] transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-3xl w-[70%] max-w-2xl sm:max-w-xl md:max-w-2xl xl:max-w-3xl max-h-[90vh] overflow-y-auto text-teal-dark shadow-xl">
    

              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-4 right-5 text-gray-700 hover:text-red-500 text-xl"
              >
                <X size={22} />
              </button>
              <h2 className="text-xl font-bold mb-2">
                Antwort an {selectedMessage.name}
              </h2>
              <textarea
                rows="5"
                className="w-full border border-caramel rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-caramel"
                placeholder="Ihre Antwort..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
              ></textarea>
              <button
                onClick={handleReplySubmit}
                disabled={loading}
                className="mt-4 bg-caramel hover:bg-chocolate text-off-white px-6 py-2 rounded-full font-haute-couture shadow-md animate-bounce-on-hover"
              >
                {loading ? "Senden..." : "Antwort senden"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEmailSupportClient;
