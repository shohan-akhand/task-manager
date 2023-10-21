const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const isAuth = require("./middleware/isAuth");
const taskRouter = require("./routes/task");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

dotenv.config();
const app = express();
const csrfProtection = csrf({ cookie: true });
app.use(cors());
app.use(express.json());
app.use("/tasks", taskRouter);
app.use("/users", userRoutes);

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(csrfProtection);
app.use(isAuth.authenticateToken, (req, res, next) => {
  res.locals.isAuth = req.user;
  res.locals.csrfToken = req.csrfToken();
  next();
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("error connections");
});
db.once("open", () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
