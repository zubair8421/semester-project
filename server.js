const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodeyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

const Rooms = require("./api/routes/Rooms");
const User = require("./api/routes/users");
// const productRoutes = require("./api/routes/products");

app.use(morgan("dev"));
app.use(bodeyParser.urlencoded({ extended: false }));
app.use(bodeyParser.json());

mongoose
  .connect(
    "mongodb+srv://Arslan:cleanheadearth@chat-boot-zi9qm.mongodb.net/test?retryWrites=true",
    {
      useMongoClient: true
    }
  )
  .then(() => console.log("Mongodb connected!"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use("/api/routes/User", User);
app.use("/api/routes/Rooms", Rooms);

const port = process.env.port || 5000;
const server = http.createServer(app);
server.listen(port);
// app.use("/products", productRoutes);

// app.use((req, res, next) => {
//   const error = new Error("Not found!");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: { message: error.message }
//   });
// });
