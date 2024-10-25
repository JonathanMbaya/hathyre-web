import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import Footer from '../../components/Footer/Footer.jsx';

function TermsConditions() {
    // Date dynamique pour la dernière mise à jour des CGV
    const lastUpdated = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className='page-terms'>
            <Container maxWidth="md">
                {/* Titre principal */}
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    style={{ marginTop: '4rem', marginBottom: '2rem', fontWeight: 'bold', color: '#333' }}
                >
                    Conditions Générales de Vente
                </Typography>

                {/* Bloc de contenu pour les conditions */}
                <Box sx={{ padding: '2rem', backgroundColor: '#fff', color: '#333' }}>
                    {/* Section 1 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        1. Objet
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre l’entreprise et ses clients dans le cadre de la vente des produits en ligne.
                    </Typography>

                    {/* Section 2 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        2. Prix
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Les prix sont indiqués en euros et incluent la TVA applicable au jour de la commande. Les frais de livraison sont précisés avant la validation de la commande.
                    </Typography>

                    {/* Section 3 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        3. Commande
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Les commandes peuvent être passées directement sur le site internet. L’acheteur recevra une confirmation de commande par e-mail après validation.
                        Ainsi qu'un suivi constant sur l'acheminement de sa commande soit par mail soit via les sites de nos transporteurs partenaires.
                    </Typography>

                    {/* Section 4 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        4. Livraison
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        La livraison des produits se fait à l’adresse indiquée lors de la commande. Les délais de livraison peuvent varier en fonction de la destination et du mode de livraison choisi.
                    </Typography>

                    {/* Section 5 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        5. Paiement
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Le paiement est exigible immédiatement à la commande. Les moyens de paiement acceptés sont la carte bancaire via Stripe et PayPal. Toutes les transactions sont sécurisées et avec validation 3D Secure.
                    </Typography>

                    {/* Section 6 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        6. Rétractation et Retours
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Conformément à la législation en vigueur, le client dispose de 14 jours pour se rétracter après réception de sa commande, sauf exceptions prévues par la loi.
                    </Typography>

                    {/* Section 7 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        7. Garantie
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Les produits bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés, selon les dispositions du Code de la consommation.
                    </Typography>

                    {/* Section 8 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        8. Protection des Données
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Conformément au RGPD, les données personnelles des clients sont traitées de manière confidentielle. L'utilisateur peut à tout moment exercer ses droits d’accès, de modification et de suppression de ses données.
                    </Typography>

                    {/* Section 9 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        9. Responsabilité
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        La société ne pourra être tenue responsable en cas de dommages résultant d'une mauvaise utilisation des produits ou d'une commande non conforme aux CGV.
                    </Typography>

                    {/* Section 10 */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        10. Droit applicable
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Les présentes conditions générales de vente sont soumises au droit français. En cas de litige, les parties s’engagent à rechercher une solution amiable avant toute action judiciaire.
                    </Typography>

                    {/* Date de mise à jour */}
                    <Typography gutterBottom style={{ marginTop: '1.5rem', fontStyle: 'italic' }}>
                        <strong>Date de dernière mise à jour :</strong> {lastUpdated}
                    </Typography>
                </Box>
            </Container>

            <Footer />
        </div>
    );
}

export default TermsConditions;
