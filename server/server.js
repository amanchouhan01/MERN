require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

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


//Router import
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const serviceRoute = require("./router/service-router"); 
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(express.json());

/* app.use(express.json()); --> This line of code adds express
 middleware that parses incoming request bodies with  json payloads.
  It is important to place this before any routes that need to 
  handle json data in the request body. This middleware is 
  responsibel for parsing json data from requests, and it should be 
  applied at the beginning of your middleware stack to ensure it is
  available for all subsequent route handlers.
*/

//Mount the Router: To use the router in your main Express app, you 
// can "mount" it at a specific URL prefix

app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRoute);

// let's define admin route
app.use("/api/admin",adminRoute); 

app.use(errorMiddleware);

// Router hamesha pehle likha jata hai,
// taaki request sabse pehle router se match ho,
// agar router match na kare tab hi server.js ke routes chale
// Pehle Router → match hua to wahi run → nahi hua to server.js
// Express top-to-bottom check karta hai,
// isliye router upar = router ko priority


/*
app.get("/", (req, res) => {
  res.status(200).send("Hello World this is aman chouhan");
});

app.get("/register", (req, res) => {
  res.status(200).send("this is the registration page");
});
*/

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
