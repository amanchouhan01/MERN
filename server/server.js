require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path"); // <--- IMPORT PATH HERE

// handling CORS (Netlify + local)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://aman-chouhan.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
  })
);

// Router import
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const serviceRoute = require("./router/service-router"); 
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(express.json());

// Mount the Router
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute); 

app.use(errorMiddleware);

// =======================================================
// ↓↓↓↓ ADD THIS SECTION HERE (AFTER ROUTES & ERROR MIDDLEWARE) ↓↓↓↓
// =======================================================

// 1. Get current directory
const _dirname = path.resolve();

// 2. Serve frontend files
// Note: If your build folder is named 'build' instead of 'dist', change it here.
app.use(express.static(path.join(_dirname, "/client/dist")));

// 3. Handle React routing (The "Wildcard" Route)
// This ensures that refreshing on pages like /admin/users works
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});

// =======================================================
// ↑↑↑↑ END OF NEW SECTION ↑↑↑↑
// =======================================================

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
