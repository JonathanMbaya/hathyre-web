import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import { LoginContext } from '../../context/login.context.jsx'; // Contexte utilisateur connecté

function MyPurchases() {
    const { userConnected } = useContext(LoginContext); // Récupérer l'utilisateur connecté
    const [purchaseHistory, setPurchaseHistory] = useState([]); // Stocker l'historique des commandes

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                if (userConnected) {
                    const response = await axios.get(`https://hathyre-server-api.onrender.com/api/client/${userConnected._id}`);                    
                    const purchaseIds = response.data.purchases;
                    const purchaseDetailsPromises = purchaseIds.map(async (purchaseId) => {
                        const purchaseResponse = await axios.get(`https://hathyre-server-api.onrender.com/api/orders/${purchaseId}`);
                        return purchaseResponse.data;
                    });

                    const purchases = await Promise.all(purchaseDetailsPromises);
                    setPurchaseHistory(purchases);
                    console.log(purchases);
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

    const handleRefundRequest = async (purchase) => {
        const currentDate = new Date();
        const orderDate = new Date(purchase.date);
        const daysSincePurchase = Math.floor((currentDate - orderDate) / (1000 * 60 * 60 * 24));

        // Vérifier si la demande de remboursement est dans la période de 14 jours
        if (daysSincePurchase > 14) {
            alert("La période de remboursement de 14 jours est expirée.");
            return;
        }

        try {
            const refundData = {
                paymentIntentId: purchase.paymentIntentId.split('_secret_')[0],
                amount: parseFloat(purchase.montantTotal),
                orderId: purchase._id,
                userEmail: purchase.email,
            };

            const response = await axios.post(`https://hathyre-server-api.onrender.com/api/stripe/refund`, refundData);
            if (response.data.success) {
                alert('Votre demande de remboursement a été envoyée.');
                // Mettre à jour l'historique des commandes localement si nécessaire
            }
        } catch (error) {
            console.error('Erreur lors de la demande de remboursement :', error);
        }
    };

    return (
        <Box sx={{ padding: '0rem' }}>
            <h2>Mes commandes</h2>

            {purchaseHistory.length > 0 ? (
                <Grid container spacing={10}>
                    {purchaseHistory.map((purchase) => (
                        <Grid item key={purchase._id} xs={12} sm={12} md={12} lg={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Commande #{purchase._id}
                                    </Typography>

                                    {purchase.articles.map((article) => (
                                        <Box 
                                            key={article._id} 
                                            sx={{ 
                                                display: "flex",
                                                justifyContent: "space-around",
                                                alignItems: "center",
                                                backgroundColor: "blanchedalmond",
                                                padding: ".5rem",
                                                borderRadius: ".3rem",
                                                marginBottom: ".5rem"
                                            }}
                                        >
                                            <img 
                                                style={{ width: '60px', height: '60px', borderRadius: '.3rem' }} 
                                                src={article.productImage} 
                                                alt={article.productName} 
                                            />
                                            <Typography>{article.quantity}</Typography>
                                            <Typography>{article.productName}</Typography>
                                            <Typography>{article.price} EUR</Typography>
                                        </Box>
                                    ))}

                                    <Typography variant="body1">
                                        Date: {new Date(purchase.date).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body1">
                                        Total: {purchase.montantTotal} EUR
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Statut: {purchase.status}
                                    </Typography>

                                    {purchase.status === 'Livré' && (
                                        <Box sx={{ marginTop: '10px' }}>
                                            <button onClick={() => handleRefundRequest(purchase)}>
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
