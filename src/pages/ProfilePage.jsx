import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit3, MapPin, Package, Heart, User, Mail, Phone, Settings } from 'lucide-react';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { AddressManager } from '../components/profile/AdressManager';
import { OrderHistory } from '../components/profile/OrderHistory';

export function ProfilePage() {
    const { currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!currentUser) {
        return (
            <div className="profile-page">
                <div className="container">
                    <div className="not-logged-in">
                        <h2>Inicia sesión para ver tu perfil</h2>
                        <p>Necesitas estar logueado para acceder a esta página.</p>
                    </div>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Perfil', icon: User },
        { id: 'addresses', label: 'Direcciones', icon: MapPin },
        { id: 'orders', label: 'Pedidos', icon: Package },
        { id: 'favorites', label: 'Favoritos', icon: Heart }
    ];

    return (
        <div className="profile-page">
            <div className="container">
                {/* Header del perfil */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                    </div>
                    <div className="profile-info">
                        <h1>{currentUser.name}</h1>
                        <p>{currentUser.email}</p>
                        <div className="profile-stats">
                            <div className="stat">
                                <strong>5</strong>
                                <span>Pedidos</span>
                            </div>
                            <div className="stat">
                                <strong>12</strong>
                                <span>Favoritos</span>
                            </div>
                            <div className="stat">
                                <strong>2</strong>
                                <span>Direcciones</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        className="edit-profile-btn"
                        onClick={() => setIsEditModalOpen(true)}
                    >
                        <Edit3 size={16} />
                        Editar Perfil
                    </button>
                </div>

                {/* Navegación por pestañas */}
                <div className="profile-tabs">
                    {tabs.map(tab => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <IconComponent size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Contenido de las pestañas */}
                <div className="tab-content">
                    {activeTab === 'profile' && (
                        <div className="profile-content">
                            <div className="info-card">
                                <h3>Información Personal</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Nombre completo</label>
                                        <p>{currentUser.name}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Email</label>
                                        <p>{currentUser.email}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Teléfono</label>
                                        <p>{currentUser.phone || 'No especificado'}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Miembro desde</label>
                                        <p>Enero 2024</p>
                                    </div>
                                </div>
                            </div>

                            <div className="info-card">
                                <h3>Preferencias</h3>
                                <div className="preferences">
                                    <div className="preference-item">
                                        <input type="checkbox" id="newsletter" defaultChecked />
                                        <label htmlFor="newsletter">Recibir newsletter con ofertas</label>
                                    </div>
                                    <div className="preference-item">
                                        <input type="checkbox" id="notifications" defaultChecked />
                                        <label htmlFor="notifications">Notificaciones de pedidos</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'addresses' && <AddressManager />}
                    
                    {activeTab === 'orders' && <OrderHistory />}
                    
                    {activeTab === 'favorites' && (
                        <div className="favorites-content">
                            <div className="empty-state">
                                <Heart size={48} />
                                <h3>Tus productos favoritos aparecerán aquí</h3>
                                <p>Cuando agregues productos a favoritos, los verás en esta sección.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <EditProfileModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </div>
    );
}