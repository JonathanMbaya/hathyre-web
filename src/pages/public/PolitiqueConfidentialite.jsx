import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import Footer from '../../components/Footer/Footer.jsx';

function PolitiqueConfidentialite() {
    // Date dynamique pour la dernière mise à jour de la politique de confidentialité
    const lastUpdated = new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className='page-politique'>
            <Container maxWidth="md">
                {/* Titre principal */}
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    style={{ marginTop: '4rem', marginBottom: '2rem', fontWeight: 'bold', color: '#333' }}
                >
                    Politique de confidentialité
                </Typography>

                {/* Bloc de contenu pour la politique de confidentialité */}
                <Box sx={{ padding: '2rem', backgroundColor: '#fff', color: '#333' }}>
                    {/* Première section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        1. Introduction
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        La présente Politique de confidentialité décrit la façon dont vos informations personnelles sont recueillies, utilisées et partagées lorsque vous vous rendez sur <strong>hathyre.com</strong> (le « Site ») en vous connectant ou  que vous y effectuez un achat.
                    </Typography>

                    {/* Deuxième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        2. Informations personnelles recueillies
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Lorsque vous visitez le Site, nous recueillons automatiquement certaines informations sur votre appareil, notamment des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies installés sur votre appareil. De plus, lorsque vous parcourez le Site, nous recueillons des informations sur les pages web ou produits que vous consultez, les sites web ou termes de recherche qui vous ont permis d'arriver sur le Site, ainsi que des informations sur la manière dont vous interagissez avec le Site.
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Nous désignons ces informations collectées automatiquement sous l'appellation « <strong>Informations sur l'appareil</strong> ».
                    </Typography>

                    {/* Sous-section : Fichiers témoins */}
                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold' }}>
                        Fichiers témoins (Cookies)
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Voici une liste des fichiers témoins que nous utilisons. Nous les avons énumérés ici pour que vous puissiez choisir si vous souhaitez les autoriser ou non :
                    </Typography>
                    <Typography component="ul" style={{ textAlign: 'justify', marginLeft: '1rem' }}>
                        <p><strong>id & token</strong> : identificateur unique de session, permet à notre serveur de stocker les informations relatives à votre session (référent, nom , prénom et favoris , commandes, etc.).</p>
                        <p><strong>Les données sessions</strong> : aucune donnée retenue, ne persiste plus d'une 1H, au bout d'une heure vous serez amener à vous reconnecter de nouveau</p>
                        <p><strong>Les données du panier</strong> : identificateur unique, persiste pendant 2 semaines, stocke l’information relative à votre panier d’achat.</p>
                        <p><strong>Token Client</strong> : identificateur unique , a pour but est de nous permettre à savoir qui est connecté et d'assurer la sécurité de vos données.</p>
                    </Typography>

                    {/* Troisième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        3. Utilisation de vos informations personnelles
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        En général, nous utilisons les Informations sur la commande que nous recueillons pour traiter les commandes passées via le Site (y compris le traitement des informations de paiement, l'organisation de l'expédition et la fourniture de factures et/ou de confirmations de commande). En outre, nous utilisons ces informations pour :
                    </Typography>
                    <Typography component="ul" style={{ textAlign: 'justify', marginLeft: '1rem' }}>
                        <p>- Communiquer avec vous via Stripe;</p>
                        <p>- Évaluer les fraudes ou risques potentiels avec Stripe ;</p>
                        <p>- Vous fournir des informations ou des publicités liées à nos produits ou services, selon les préférences que vous avez partagées avec nous.</p>
                    </Typography>

                    {/* Quatrième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        4. Partage de vos informations personnelles
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Nous partageons vos informations personnelles avec des tiers pour nous aider à les utiliser comme décrit ci-dessus. Par exemple, nous utilisons IONOS pour héberger notre boutique en ligne. Pour plus de détails sur l'utilisation de vos informations personnelles par IONOS, consultez cette page : <a href="https://www.ionos.fr/terms-gtc/clause-de-confidentialite/?source=termsandconditions" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>Politique de confidentialité de IONOS</a>.
                        De plus pour nous perrmettre de sécuriser toutes les transactions d'argent, et nous permettre de faire un suivi complet sur toutes les données nécessaires à l'amélioration de nos services nous octroyaosn le droit de à Stripe de récolter vos données pour réaliser les paienements.
                    </Typography>

                    {/* Cinquième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        5. Publicité comportementale
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Comme indiqué ci-dessus, nous utilisons vos Informations personnelles pour vous fournir des publicités ciblées ou des communications marketing que nous pensons susceptibles de vous intéresser. Pour plus d’informations sur le fonctionnement de la publicité ciblée, vous pouvez consulter la page informative de la <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>Network Advertising Initiative</a>.
                    </Typography>

                    {/* Liste de liens pour désactiver la publicité comportementale */}
                    <Typography component="ul" style={{ textAlign: 'justify', marginLeft: '1rem' }}>
                        <li><a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>Facebook</a></li>
                        <li><a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>Google</a></li>
                        <li><a href="https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>Bing</a></li>
                    </Typography>

                    {/* Sixième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        6. Vos droits
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Si vous êtes résident(e) européen(ne), vous avez le droit d’accéder aux informations personnelles que nous détenons sur vous et de demander à ce qu’elles soient corrigées, mises à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez nous contacter via les informations de contact ci-dessous.
                    </Typography>

                    {/* Septième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        7. Rétention des données
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Lorsque vous passez une commande via le Site, nous conservons les Informations sur votre commande dans nos dossiers à moins que et jusqu'à ce que vous nous demandiez de les supprimer.
                    </Typography>

                    {/* Huitième section */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        8. Modifications
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Nous pouvons mettre à jour cette politique de confidentialité de temps à autre afin de refléter, par exemple, les changements apportés à nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires.
                    </Typography>

                    {/* Contact */}
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
                        9. Nous contacter
                    </Typography>
                    <Typography paragraph style={{ textAlign: 'justify' }}>
                        Pour en savoir plus sur nos pratiques de confidentialité, si vous avez des questions ou si vous souhaitez déposer une plainte, veuillez nous contacter par e-mail à <strong>hathyre-assistance@gmail.com</strong>, ou par courrier à l’adresse suivante :<br />
                        8 Passage Edith Piaf , 91390 Morsang-sur-Orge.
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

export default PolitiqueConfidentialite;
