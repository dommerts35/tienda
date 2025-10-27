import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, Star, MapPin } from 'lucide-react';
import { AddressModal } from './AdressModal';

export function AddressManager() {
    const { currentUser, deleteAddress, setDefaultAddress } = useAuth();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setIsAddressModalOpen(true);
    };

    const handleAddAddress = () => {
        setEditingAddress(null);
        setIsAddressModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddressModalOpen(false);
        setEditingAddress(null);
    };

    const handleDeleteAddress = async (addressId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta dirección?')) {
            await deleteAddress(addressId);
        }
    };

    const handleSetDefault = async (addressId) => {
        await setDefaultAddress(addressId);
    };

    return (
        <div className="address-manager">
            <div className="section-header">
                <h3>Mis Direcciones</h3>
                <button 
                    className="add-address-btn"
                    onClick={handleAddAddress}
                >
                    <Plus size={18} />
                    Agregar Dirección
                </button>
            </div>

            {currentUser.addresses.length === 0 ? (
                <div className="empty-state">
                    <MapPin size={48} />
                    <h4>No tienes direcciones guardadas</h4>
                    <p>Agrega una dirección para recibir tus pedidos más rápido.</p>
                    <button 
                        className="cta-button primary"
                        onClick={handleAddAddress}
                    >
                        <Plus size={18} />
                        Agregar Primera Dirección
                    </button>
                </div>
            ) : (
                <div className="addresses-grid">
                    {currentUser.addresses.map(address => (
                        <div 
                            key={address.id} 
                            className={`address-card ${address.isDefault ? 'default' : ''}`}
                        >
                            {address.isDefault && (
                                <div className="default-badge">
                                    <Star size={14} fill="currentColor" />
                                    Principal
                                </div>
                            )}
                            
                            <div className="address-content">
                                <h4>{address.street}</h4>
                                <p>{address.city}, {address.state}</p>
                                <p>{address.zipCode}</p>
                            </div>

                            <div className="address-actions">
                                {!address.isDefault && (
                                    <button
                                        className="action-btn set-default"
                                        onClick={() => handleSetDefault(address.id)}
                                        title="Establecer como principal"
                                    >
                                        <Star size={16} />
                                    </button>
                                )}
                                <button
                                    className="action-btn edit"
                                    onClick={() => handleEditAddress(address)}
                                    title="Editar dirección"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    className="action-btn delete"
                                    onClick={() => handleDeleteAddress(address.id)}
                                    title="Eliminar dirección"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={handleCloseModal}
                address={editingAddress}
            />
        </div>
    );
}