import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const API_URL = import.meta.env.VITE_SERVER_URL;

const COLORS = ["#116769", "#F4B400", "#E74C3C", "#8E44AD", "#3498DB"];

const AdminBookingDashboard = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const fetchBookingStats = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/dashboard/bookings/all`);


        const monthly = new Map();
        const status = new Map();

        data.forEach(({ createdAt, status: s }) => {
          const date = new Date(createdAt);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          monthly.set(key, (monthly.get(key) || 0) + 1);
          status.set(s, (status.get(s) || 0) + 1);
        });

        setMonthlyData(
          Array.from(monthly.entries())
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([month, count]) => ({ month, count }))
        );

        setStatusData(
          Array.from(status.entries()).map(([name, value]) => ({ name, value }))
        );
      } catch (error) {
        console.error("Fehler beim Laden der Buchungen:", error);
      }
    };

    fetchBookingStats();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
          Buchungs-Dashboard
        </h2>

        <div className="bg-white p-6 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-xl font-semibold text-forest-green mb-4">
              Monatliche Buchungen
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#116769"
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-forest-green mb-4">
              Status-Verteilung
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#116769"
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminBookingDashboard;