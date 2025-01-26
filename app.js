import express from "express";
import { ApplicationError } from "./src/Middleware/Error-Handling/applicationError.js";
import userRoute from "./src/Routes/user.route.js";
import astroRoute from "./src/Routes/astrologer.route.js";
import session from "express-session";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(session({

  secret:"12345",
  resave:false,
  saveUninitialized:true,

  cookie:{
    httpOnly:true,
    secure:false,
    maxAge: 1000 * 60 * 60,
  }
}))

app.use("/api/user", userRoute);
app.use("/api/astro", astroRoute);


app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  } else {
    console.error(err);
    res.status(500).send("Something went wrong, please try later");
  }
});

app.use((req, res) => {
  return res
    .status(404)
    .send(`This Page Doen't Exist , Read the "Readme.md" File`);
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error in Starting the Server", err);
  }
  console.log("Server is Starting Successfully:-", port);
});
