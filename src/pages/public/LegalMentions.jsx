import React from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import Footer from '../../components/Footer/Footer.jsx';
import 'animate.css';

function LegalMentions() {

    // Date dynamique pour la dernière mise à jour des mentions légales
    const lastUpdated = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className='page-about'>
            <Container maxWidth="md">
                <Typography 
                    variant="h4" 
                    align="center" 
                    gutterBottom 
                    className='animate__animated animate__fadeInUp' 
                    style={{ marginTop: '5rem', color: 'black' }}
                >
                    Mentions Légales
                </Typography>

                <Box sx={{ padding: '1rem', color: 'black', borderRadius: '10px', fontSize : "10px" }}>
                    <Grid container spacing={4}>
                        {/* Section Gauche */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>Informations Générales</Typography>
                            <Typography><strong>Nom de l’entreprise :</strong> KEKELI</Typography>
                            <Typography><strong>Forme juridique :</strong> SASU</Typography>
                            <Typography><strong>Capital social :</strong> 2000€</Typography>
                            <Typography><strong>Adresse du siège social :</strong> 50 avenue des Champs Elysees</Typography>
                            <Typography><strong>Immatriculation :</strong> 92479472000012</Typography>
                            <Typography><strong>Numéro de TVA :</strong> FR66924794720</Typography>

                            <Typography variant="h6" gutterBottom style={{ marginTop: '1.5rem' }}>Coordonnées de Contact</Typography>
                            <Typography><strong>Email :</strong> info@welovekekeli.com</Typography>
                            <Typography><strong>Téléphone :</strong> (à compléter)</Typography>
                            <Typography>
                                <strong>Formulaire de contact :</strong> 
                                <a href="https://welovekekeli.com/pages/contact" style={{ color: '#fff', textDecoration: 'underline' }}> Contactez-nous</a>
                            </Typography>

                            <Typography variant="h6" gutterBottom style={{ marginTop: '1.5rem' }}>Hébergeur</Typography>
                            <Typography><strong>Nom :</strong> Shopify Inc.</Typography>
                            <Typography><strong>Adresse :</strong> 150 Elgin Street, Suite 800, Ottawa, Ontario, K2P 1L4, Canada</Typography>
                            <Typography><strong>Téléphone :</strong> 1-888-746-7439</Typography>
                        </Grid>

                        {/* Section Droite */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>Directeur de la Publication</Typography>
                            <Typography><strong>Nom :</strong> Anthony-Lafa Myléna</Typography>
                            <Typography><strong>Email :</strong> myle.efua@gmail.com</Typography>

                            <Typography variant="h6" gutterBottom style={{ marginTop: '1.5rem' }}>Propriété Intellectuelle</Typography>
                            <Typography>
                                Le contenu du site (textes, images, graphismes, logo, etc.) est la propriété exclusive de Kekeli. Toute reproduction, 
                                distribution, modification, adaptation, retransmission ou publication est interdite sans l'accord préalable de Kekeli.
                            </Typography>

                            <Typography variant="h6" gutterBottom style={{ marginTop: '1.5rem' }}>Données Personnelles</Typography>
                            <Typography>
                                Conformément à la loi Informatique et Libertés du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification 
                                et de suppression des données personnelles. Pour exercer ces droits, contactez-nous à info@welovekekeli.com.
                            </Typography>

                            <Typography variant="h6" gutterBottom style={{ marginTop: '1.5rem' }}>Cookies</Typography>
                            <Typography>
                                Le site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez paramétrer votre navigateur 
                                pour refuser les cookies.
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Section globale (s'étend sur les deux colonnes) */}
                    <Grid container spacing={4} sx={{ marginTop: '2rem' }}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>Responsabilité</Typography>
                            <Typography>
                                Kekeli s'efforce de fournir des informations précises sur le site. Toutefois, Kekeli ne peut être tenue responsable 
                                des omissions, inexactitudes ou carences dans la mise à jour.
                            </Typography>

                            <Typography variant="h6" gutterBottom style={{ marginTop: '1.5rem' }}>Droit Applicable</Typography>
                            <Typography>
                                Les présentes mentions légales sont régies par le droit français. En cas de litige, compétence est attribuée 
                                aux tribunaux français.
                            </Typography>

                            <Typography variant="h6" gutterBottom style={{ marginTop: '1.5rem' }}>Modification des Mentions Légales</Typography>
                            <Typography>
                                Kekeli se réserve le droit de modifier les présentes mentions légales à tout moment. Nous vous invitons à les consulter 
                                régulièrement pour rester informé des éventuelles modifications.
                            </Typography>

                            <Typography gutterBottom style={{ marginTop: '1.5rem' }}>
                                <strong>Date de dernière mise à jour :</strong> {lastUpdated}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

            </Container>

            <Footer />
        </div>
    );
}

export default LegalMentions;
