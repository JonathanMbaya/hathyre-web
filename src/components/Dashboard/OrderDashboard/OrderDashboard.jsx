import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Pagination from '../../Pagination/Pagination.jsx'; // Assurez-vous que le chemin est correct

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [showTrackingPopup, setShowTrackingPopup] = useState(false);
    const [filteredStatus, setFilteredStatus] = useState(''); // État pour filtrer les commandes par statut
    const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche
    const [selectedOrderId, setSelectedOrderId] = useState(null); // État pour l'ID de la commande sélectionnée

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://hathyre-server-api.onrender.com/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`https://hathyre-server-api.onrender.com/api/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande:', error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus, trackingNumber = '') => {
        try {
            await axios.patch(`https://hathyre-server-api.onrender.com/api/orders/${orderId}/status`, { status: newStatus, trackingNumber });
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus, trackingNumber } : order
            ));
            sendEmailNotification(orderId, newStatus, trackingNumber); // Envoyer un e-mail après mise à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de la commande:', error);
        }
    };

    const sendEmailNotification = async (orderId, newStatus, trackingNumber = '') => {
        const order = orders.find(order => order._id === orderId);
        if (!order) return;

        try {
            await axios.post('https://hathyre-server-api.onrender.com/api/send-email', {
                to: order.email,
                subject: `Mise à jour de votre commande ${orderId}`,
                text: `Bonjour ${order.prenom},\n\nVotre commande est maintenant "${newStatus}".${newStatus === 'Expédié' ? `\nNuméro de suivi : ${trackingNumber}` : ''}\n\nMerci pour votre achat !`
            });
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handlePageChange = (page) => setCurrentPage(page);

    const handleStatusChange = (e, orderId) => {
        const status = e.target.value;

        if (status === 'Expédié') {
            setSelectedOrderId(orderId); // Mettez à jour l'ID de la commande sélectionnée
            setShowTrackingPopup(true);
        } else {
            updateOrderStatus(orderId, status);
        }
    };

    const handleTrackingSubmit = () => {
        if (trackingNumber && selectedOrderId) {
            updateOrderStatus(selectedOrderId, 'Expédié', trackingNumber); // Utilisez selectedOrderId
            setShowTrackingPopup(false);
            setTrackingNumber('');
        } else {
            alert('Veuillez entrer un numéro de suivi.');
        }
    };

    // Fonction pour filtrer les commandes par statut
    const filterOrders = (status) => {
        setFilteredStatus(status);
        setCurrentPage(1); // Réinitialiser à la première page lors du filtrage
    };

    const filteredOrders = orders.filter(order => {
        return (
            (filteredStatus ? order.status === filteredStatus : true) &&(
            (searchTerm ? order.nom.toLowerCase().includes(searchTerm.toLowerCase()) : true) ||
            (searchTerm ? order.prenom.toLowerCase().includes(searchTerm.toLowerCase()) : true)||
            (searchTerm ? order._id.toLowerCase().includes(searchTerm.toLowerCase()) : true) ||
            (searchTerm ? order.email.toLowerCase().includes(searchTerm.toLowerCase()) : true))

        );
    });

    return (

        <>

            <div className="table-responsive">
                <div style={{ backgroundColor: 'white', borderRadius: '.5rem .5rem 0 0' }} className='head-dash'>
                    <h3 style={{ margin: '.5rem' }}>Commandes</h3>
                </div>

                {/* Barre de recherche */}
                <div className='filter-admin'>

                    <div className="search-filter">
                        <input
                            type="text"
                            placeholder="Rechercher une commande..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-buttons">
                        <button onClick={() => filterOrders('')}>Toutes</button>
                        <button onClick={() => filterOrders('En cours de préparation')}>En cours de préparation</button>
                        <button onClick={() => filterOrders('Expédié')}>Expédié</button>
                        <button onClick={() => filterOrders('Livré')}>Livré</button>
                        <button onClick={() => filterOrders('Annulé')}>Annulé</button>
                    </div>


                </div>

            </div>

            <div className='table-responsive'>

                <table className='users-table'>
                    <thead>
                        <tr>
                            <th>Ref. Commande</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Adresse de livraison</th>
                            <th>Email</th>
                            <th>Tel. Mobile</th>
                            <th>Articles</th>
                            <th>Montant</th>
                            <th>Date d'achat</th>
                            <th>Statut</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.slice(currentPage * ordersPerPage - ordersPerPage, currentPage * ordersPerPage).map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.nom}</td>
                                <td>{order.prenom}</td>
                                <td>{order.address}</td>
                                <td>{order.email}</td>
                                <td>{order.mobile}</td>
                                <td>
                                    {order.articles.map(article => (
                                        <div key={article.productId}>
                                            {article.quantity} x {article.productName}
                                        </div>
                                    ))}
                                </td>
                                <td>{order.montantTotal} EUR</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>
                                    <select
                                        name="statut"
                                        id="statut"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(e, order._id)}
                                    >
                                        <option value="En cours de préparation">En cours de préparation</option>
                                        <option value="Expédié">Expédié</option>
                                        <option value="Livré">Livré</option>
                                        <option value="Annulé">Annulé</option>
                                    </select>
                                </td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        onClick={() => handleStatusChange({ target: { value: order.status } }, order._id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                                <td>
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => deleteOrder(order._id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalCount={filteredOrders.length}
                    pageSize={ordersPerPage}
                    onPageChange={handlePageChange}
                />

                {showTrackingPopup && (
                    <div className="tracking-popup">
                        <div className="tracking-popup-content">
                            <h3>Entrez le numéro de suivi</h3>
                            <input
                                type="text"
                                placeholder="Numéro de suivi ou lien"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                            />
                            <button onClick={handleTrackingSubmit}>Envoyer</button>
                            <button onClick={() => setShowTrackingPopup(false)}>Annuler</button>
                        </div>
                    </div>
                )}
            </div>
        
        
        
        </>
       
    );
};

export default OrderDashboard;
