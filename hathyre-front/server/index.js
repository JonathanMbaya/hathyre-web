import express from "express";
import { connectDB } from "./db"; // Assurez-vous que le chemin vers le fichier db.mjs est correct
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;

// Connexion à la BDD
connectDB();

// Start Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Créer un produit
app.post('/api/add/product', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Lire toutes les données des produits
app.get('/api/all/products', (req, res) => {
    Model.find({}, (err, products) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la récupération des produits.");
        } else {
            res.send(products);
        }
    });
});

// Lire les données d'un produit
app.get('/api/one/product/:id', (req, res) => {
    Model.findOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la récupération du produit.");
        } else {
            res.send(product);
        }
    });
});

// Mise à jour des données de produits
app.put('/api/update/product/:id', (req, res) => {
    Model.updateOne({ _id: req.params.id }, { $set: req.body }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la mise à jour du produit.");
        } else {
            res.json({ update: 'Produit mis à jour avec id :' + req.params.id });
        }
    });
});

// Supprimer des données de produits
app.delete('/api/delete/product/:id', (req, res) => {
    Model.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression du produit.");
        } else {
            res.json({ delete: 'Produit supprimé avec id :' + req.params.id });
        }
    });
});

// Api d'ajout de produit en favori
app.patch('/api/liked/:id', (req, res) => {
    res.json({ like: 'Produit liké id :' + req.params.id });
});

app.patch('/api/disliked/:id', (req, res) => {
    res.json({ like: 'Produit disliké id :' + req.params.id });
});

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`);
});
