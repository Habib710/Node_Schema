const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");


const app = require("./app");

// database connection
// DBConnect();
mongoose.connect(process.env.DATABASE).then(() => {
console.log("dataBase Conected ");
})

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

