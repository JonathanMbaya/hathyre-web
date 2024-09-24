import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Footer from "../Footer/Footer.jsx";

function Faq() {
  const faqData = [
    {
      question: "Comment puis-je m'inscrire ?",
      answer: "Pour vous inscrire, cliquez sur le bouton 'S'inscrire' en haut de la page et remplissez le formulaire d'inscription.",
    },
    {
      question: 'Quels sont les modes de paiement acceptés ?',
      answer: 'Nous acceptons les cartes de crédit, PayPal et les virements bancaires.',
    },
    {
      question: 'Comment puis-je suivre ma commande ?',
      answer: 'Vous pouvez suivre votre commande en vous connectant à votre compte et en accédant à la section "Mes commandes".',
    },
  ];

  return (

    <>
        <Container maxWidth="md" sx={{ marginTop: '10rem', padding: { xs: '1rem', sm: '2rem' } }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: '2rem', fontWeight: 'bold', color:"#895832" }}>
            Foire aux Questions
        </Typography>

        <Grid container spacing={3}>
            {faqData.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
                <Accordion sx={{ boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
                <AccordionSummary
                    expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{ backgroundColor: '#f5f5f5' }}
                >
                    <Typography variant="h6">{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: '#fff' }}>
                    <Typography>{item.answer}</Typography>
                </AccordionDetails>
                </Accordion>
            </Grid>
            ))}
        </Grid>


        </Container>
        <Footer/>

    </>
  );
}

export default Faq;
