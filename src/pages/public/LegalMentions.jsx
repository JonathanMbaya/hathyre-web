import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import Footer from '../../components/Footer/Footer.jsx';

function LegalMentions() {
    // Date dynamique pour la dernière mise à jour des mentions légales
    const lastUpdated = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className='page-mentions'>
            <Container maxWidth="md">
                {/* Titre principal */}
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    style={{ marginTop: '4rem', marginBottom: '2rem', fontWeight: 'bold', color: '#333' }}
                >
                    Mentions légales
                </Typography>

                {/* Bloc de contenu pour les mentions légales */}
                <Box sx={{ padding: '2rem', backgroundColor: '#fff', color: '#333' }}>
                    {/* Première section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        1. Informations Générales
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Nom de l’entreprise : <strong>KEKELI</strong><br />
                        Forme juridique : SASU<br />
                        Capital social : 2000€<br />
                        Adresse du siège social : 50 avenue des Champs Elysées<br />
                        Immatriculation : 92479472000012<br />
                        Numéro de TVA intracommunautaire : FR66924794720
                    </Typography>

                    {/* Deuxième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        2. Coordonnées de Contact
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Email : info@welovekekel.com<br />
                        Formulaire de contact : <a href="https://welovekekeli.com/pages/contact" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>Contactez-nous</a>
                    </Typography>

                    {/* Troisième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        3. Hébergeur
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Nom de l’hébergeur : Shopify Inc.<br />
                        Adresse de l’hébergeur : 150 Elgin Street, Suite 800, Ottawa, Ontario, K2P 1L4, Canada<br />
                        Téléphone de l’hébergeur : 1-888-746-7439
                    </Typography>

                    {/* Quatrième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        4. Directeur de la Publication
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Nom du directeur de la publication : Anthony-Lafa Myléna<br />
                        Email : myle.efua@gmail.com
                    </Typography>

                    {/* Cinquième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        5. Propriété Intellectuelle
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Le contenu du site (textes, images, graphismes, logo, etc.) est la propriété exclusive de Kekeli, sauf mention contraire. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord écrit préalable de Kekeli.
                    </Typography>

                    {/* Sixième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        6. Données Personnelles
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD) du 27 avril 2016, vous disposez d'un droit d'accès, de rectification, de suppression, de limitation, de portabilité et d'opposition aux données personnelles vous concernant. Pour exercer ces droits, vous pouvez contacter Kekeli à l'adresse suivante : info@welovekekeli.com.
                    </Typography>

                    {/* Septième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        7. Cookies
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Le site utilise des cookies pour améliorer l'expérience utilisateur, pour des mesures d’audience et des fonctionnalités de partage sur les réseaux sociaux. Vous pouvez paramétrer votre navigateur pour refuser les cookies.
                    </Typography>

                    {/* Huitième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        8. Responsabilité
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Kekeli s'efforce de fournir sur le site des informations aussi précises que possible. Cependant, Kekeli ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                    </Typography>

                    {/* Neuvième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        9. Droit Applicable
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de recherche d'une solution amiable, compétence expresse est attribuée aux tribunaux français.
                    </Typography>

                    {/* Dixième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        10. Modification des Mentions Légales
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Kekeli se réserve le droit de modifier les présentes mentions légales à tout moment. L'utilisateur est invité à les consulter régulièrement afin de prendre connaissance de modifications éventuelles.
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

export default LegalMentions;
