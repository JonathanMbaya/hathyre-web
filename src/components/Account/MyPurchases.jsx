import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import { LoginContext } from '../../context/login.context.jsx'; // Contexte utilisateur connecté

function MyPurchases() {
    const { userConnected } = useContext(LoginContext); // Récupérer l'utilisateur connecté
    const [purchaseHistory, setPurchaseHistory] = useState([]); // Stocker l'historique des commandes
    // const [articles, setArticles] = useState([]); // Stocker l'historique des commandes


    // Charger l'historique des commandes de l'utilisateur à partir de l'API
    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                if (userConnected) {
                    // Appel API pour récupérer l'historique des commandes
                    const response = await axios.get(`https://hathyre-server-api.onrender.com/api/client/${userConnected._id}`);                    
                    const purchaseIds = response.data.purchases;
                    // Étape 2 : Récupérer les détails de chaque commandes passées
                    const purchaseDetailsPromises = purchaseIds.map(async (purchaseId) => {
                        const purchaseResponse = await axios.get(`https://hathyre-server-api.onrender.com/api/orders/${purchaseId}`);
                        return purchaseResponse.data;
                    });

                    // Attendre que toutes les requêtes soient terminées
                    const purchase = await Promise.all(purchaseDetailsPromises);
                    setPurchaseHistory(purchase); // Mettre à jour les produits favoris avec les informations complètes

                    console.log(purchase);

                    // const articleDetailsPromises = purchase.map(async (articleId) => {
                    //     const articleData = await axios.get(`https://hathyre-server-api.onrender.com/api/product/${articleId.productId}`);
                    //     return articleData.data;

                    // });

                    // // Attendre que toutes les requêtes soient terminées
                    // const articleDatas = await Promise.all(articleDetailsPromises);
                    // setArticles(articleDatas); // Mettre à jour les produits favoris avec les informations complètes

                }
                
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes :', error);
            }
        };

        fetchPurchases();
    }, [userConnected]);

    if (!userConnected) {
        return <Typography variant="h6">Veuillez vous connecter pour voir vos commandes.</Typography>;
    }

    // Fonction pour demander un remboursement
    const handleRefundRequest = async (orderId) => {
        try {
            const response = await axios.post(`https://hathyre-server-api.onrender.com/api/purchases/${orderId}/refund`);
            if (response.data.success) {
                alert('Votre demande de remboursement a été envoyée.');
                // Mettre à jour l'historique des commandes localement si nécessaire
            }
        } catch (error) {
            console.error('Erreur lors de la demande de remboursement :', error);
        }
    };

    return (
        <Box sx={{ padding: '2rem' }}>
            <h2>Mes commandes</h2>

            {purchaseHistory.length > 0 ? (
                <Grid container spacing={10}>
                    {purchaseHistory.map((purchase) => (
                        <Grid item key={purchase._id} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ minWidth: "400px" }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Commande #{purchase._id}
                                    </Typography>
                                    <Typography variant="body1">
                                        Date: {new Date(purchase.date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1">
                                        Total: {purchase.montantTotal} EUR
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Statut: {purchase.status}
                                    </Typography>

                                    {/* Bouton pour demander un remboursement */}
                                    {purchase.status === 'Livré' && (
                                        <Box sx={{ marginTop: '10px' }}>
                                            <button onClick={() => handleRefundRequest(purchase._id)}>
                                                Demander un remboursement
                                            </button>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1">Vous n'avez passé aucune commande.</Typography>
            )}
        </Box>
    );
}

export default MyPurchases;
