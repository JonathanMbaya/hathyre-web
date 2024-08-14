import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Pagination from '../../Pagination/Pagination.jsx'; // Assurez-vous que le chemin est correct

const OrderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5); // Nombre d'ordres par page

    // Fonction pour récupérer les commandes
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
        }
    };

    // Fonction pour supprimer une commande
    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande:', error);
        }
    };

    // Fonction pour mettre à jour le statut de la commande
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.patch(`http://localhost:8080/api/orders/${orderId}/status`, { status: newStatus });
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de la commande:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Calculer les commandes à afficher sur la page actuelle
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Fonction appelée lors du changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // Fonction pour gérer le changement de statut via le sélecteur
    const handleStatusChange = (e, orderId) => {
        const newStatus = e.target.value;
        updateOrderStatus(orderId, newStatus);
    };

    return (
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
                    {currentOrders.map(order => (
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
                                    onChange={(e) => handleStatusChange(e, order._id)}
                                >
                                    <option value="En cours de préparation">En cours de préparation</option>
                                    <option value="Expédié">Expédié</option>
                                    <option value="Delivered">Livré</option>
                                    <option value="Cancelled">Annulé</option>
                                </select>
                            </td>
                            <td>
                                <FontAwesomeIcon 
                                    icon={faEdit} 
                                    onClick={updateOrderStatus}
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
                totalCount={orders.length}
                pageSize={ordersPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default OrderDashboard;
