// Import dependencies/packages
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// Connecting the Database Management System to the Node Environment
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Check if there is a connection to the Database
db.connect((err) => {
  if (err) {
    return console.log("Error connecting to MySQL");
  }
  console.log("Connected successfully to MySQL as Id:", db.threadId);
});

// */ Retrieving the Data from the Database
// Get Method

// 1. Retrieve all patients
app.get("/patients", (req, res) => {
  const patientQuery =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";

  // In the query we will add a callback functions when the query is done then it should show the results
  db.query(patientQuery, (err, patientResults) => {
    if (err) {
      // This is the error that will be displayed
      return res.status(500).send("Error retrieving the Patients data");
    }
    // If there is no error then show the patients data
    res.status(200).send(patientResults);
  });
});

// 2. Retrieve all providers
app.get("/providers", (req, res) => {
  const providerQuery =
    "SELECT first_name, last_name, provider_specialty FROM providers";
  db.query(providerQuery, (err, providerResults) => {
    if (err) {
      return res.status(500).send("Error retrieving the Providers data");
    }
    //If there is no error then show the providers data
    res.status(200).send(providerResults);
  });
});

// 3. Filter patients by First Name
app.get("/firstName", (req, res) => {
  const firstNameQuery = "SELECT first_name FROM patients";
  db.query(firstNameQuery, (err, firstNameResults) => {
    if (err) {
      return res.status(500).send("Error retrieving the Providers data");
    }
    res.status(200).send(firstNameResults);
  });
});

// 4. Retrieve all providers by their specialty
// provider_specialty
app.get("/specialty", (req, res) => {
  const providerSpecialtyQuery = "SELECT provider_specialty FROM providers";
  db.query(providerSpecialtyQuery, (err, specialtyResults) => {
    if (err) {
      return res.status(500).send("Error retrieving the Specialty data");
    }
    res.status(200).send(specialtyResults);
  });
});

// Start the Server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);

  app.get("/", (req, res) => {
    res.send("Server started successfully!");
  });
});
