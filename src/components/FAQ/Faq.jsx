import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faMinus } from '@fortawesome/free-solid-svg-icons';
import "./Faq.css";

function Faq() {
    const faqData = [
        {
            question: 'Comment puis-je m\'inscrire?',
            answer: 'Pour vous inscrire, cliquez sur le bouton "S\'inscrire" en haut de la page et remplissez le formulaire d\'inscription.',
        },
        {
            question: 'Quels sont les modes de paiement acceptés?',
            answer: 'Nous acceptons les cartes de crédit, PayPal et les virements bancaires.',
        },
        {
            question: 'Comment puis-je suivre ma commande?',
            answer: 'Vous pouvez suivre votre commande en vous connectant à votre compte et en accédant à la section "Mes commandes".',
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='page-faq'>
            <h1 style={{padding : '2rem'}}>Foire aux questions</h1>
            <div className="faq">
                {faqData.map((item, index) => (
                    <div key={index} className="item-faq">
                        <div
                            className="title-faq"
                            onClick={() => handleToggle(index)}
                        >
                            {item.question}                             
                            
                            {activeIndex === index ? (
                                <FontAwesomeIcon icon={faMinus} />
                            ) : (
                                <FontAwesomeIcon icon={faPlus} />
                            )}
                            
                        </div>
                        {activeIndex === index && (
                            <p className="text-faq">
                                {item.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Faq;
