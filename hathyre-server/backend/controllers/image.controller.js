const Product = require("../models/product.model");
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Répertoire de destination des images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom de fichier unique avec l'extension d'origine
  }
});

// Filtrer les fichiers acceptés
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Accepter le fichier
  } else {
    cb(new Error('Seuls les fichiers JPEG et PNG sont acceptés.'), false); // Rejeter le fichier
  }
};

// Initialisation de multer
const upload = multer({ storage: storage, fileFilter: fileFilter });


module.exports.setImage = async (req, res) => {
    try {
      if (!req.file) {
        // Si aucun fichier n'a été téléchargé, renvoyer une erreur
        return res.status(400).json({ error: "Aucun fichier n'a été téléchargé." });
      }
      // Renvoyer le chemin de l'image téléchargée
      res.status(200).json({ image: '/img-products/' + req.file.file });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Une erreur s'est produite lors du téléchargement de l'image.");
    }
  }
