const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const multer = require('multer');
const path = require('path');
const port = 5000;

// connexion à la DB
connectDB();

const app = express();

// Utilisez le middleware cors
app.use(cors());

// Middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api", require("./routes/product.routes"));
app.use("/api", require("./routes/user.routes"));

  

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
