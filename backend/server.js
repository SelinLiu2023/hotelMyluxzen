import express from "express";
import dotenv from "dotenv";
import session from "express-session"; //Naheeda
import passport from "./utils/passport.js"; //Naheeda
import { connect } from "./utils/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser"; //Naheeda
// here is for routers, begin
import { bookingRouter } from "./routes/bookingRouter.js";
import imageRoutes from "./routes/imageRoutes.js";
import { authRouter } from "./routes/authRouter.js"; // authRouter durch Naheeda importiert
import hausRoutes from "./routes/HausRoutes.js"; //Minas
import reviewRouter from "./routes/reviewRouter.js"; //Minas
import { singleHouseRouter } from "./routes/singleHouseRouter.js"; // Xiangyu
import { dashboardRouter } from "./routes/dashboardRouter.js"; //Zahra
import contactRoutes from "./routes/contact.routes.js"; //zahra
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// here is for routers, end

dotenv.config();
connect();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use("/uploads", express.static("uploads"));
// 📌 Routes, Zahra

//app.use(cookieParser()); //Add Cookieparser von Naheeda
//app.use(express.json());
app.use(express.json()); // ✅ JSON Body parsen
app.use(express.urlencoded({ extended: true })); // ✅ Formulardaten parsen
app.use(cookieParser());

const allowedOrigins = [
  "https://myluxzen.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



// Session-Middleware für Passport-google anmeldung
app.use(
  //Naheeda
  session({
    secret: "geheimesToken",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get("/", (req, res) => {
//   res.send("✅ Myluxzen API läuft... 🚀");
// });
// here add routers, begin
// booking router,  Xiangyu
app.use("/booking", bookingRouter); //Xiangyu
app.use("/singleHouse", singleHouseRouter); //Xiangyu

// 📌 Servir les images statiques, Zahra

app.use("/api/images", imageRoutes);

app.use("/api/auth", authRouter); // authRouter durch Naheeda hinzugefügt
// Minas
app.use("/api/houses", hausRoutes);
app.use("/api/reviews", reviewRouter);

//zahra
app.use("/api/dashboard", dashboardRouter);

//zahra
app.use("/api/contact", contactRoutes);

// zahra
app.use("/api/user", authRouter);

// test: change from dev direct
// test: change from Xiangyu-branch direct
//here add routers, end
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server läuft auf ${process.env.MONGODB_URL}:${PORT}`);
});
