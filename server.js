require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/books",
  require("./routes/bookRoutes")
);

app.use(
  "/api/members",
  require("./routes/memberRoutes")
);

const PORT = process.env.PORT || 5000;


app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

