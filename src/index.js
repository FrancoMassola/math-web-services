const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const morgan = require("morgan");

//settings
app.set("port", process.env.PORT || 8080);
app.set("json spaces", 2);

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/math", require("./routes/math"));

//starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port " + app.get("port"));
});
