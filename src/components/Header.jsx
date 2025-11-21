import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Home, Grid, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

export function Header({ 
    cartCount, 
    onCartClick 
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleUserMenuToggle = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const isActivePath = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header>
            <Link to="/" className="logo">
                Mi Tienda Online
            </Link>
            
            <button 
                className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                onClick={handleMenuToggle}
                aria-label="Menú principal"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={isMenuOpen ? 'active' : ''}>
                <ul>
                    <li>
                        <Link 
                            to="/" 
                            className={isActivePath('/') ? 'active' : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home size={16} style={{ marginRight: '8px' }} />
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/catalogo" 
                            className={isActivePath('/catalogo') ? 'active' : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Grid size={16} style={{ marginRight: '8px' }} />
                            Catálogo
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/regalos" 
                            className={isActivePath('/regalos') ? 'active' : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Regalos
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/ropa" 
                            className={isActivePath('/ropa') ? 'active' : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Ropa
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/servicios" 
                            className={isActivePath('/servicios') ? 'active' : ''}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Servicios Legales
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="header-actions">
                {currentUser ? (
                    <div className="user-menu">
                        <button 
                            className="user-btn"
                            onClick={handleUserMenuToggle}
                        >
                            <User size={20} />
                            <span className="user-name">{currentUser.name.split(' ')[0]}</span>
                        </button>
                        
                        {isUserMenuOpen && (
                            <div className="user-dropdown">
                                <div className="user-info">
                                    <strong>{currentUser.name}</strong>
                                    <span>{currentUser.email}</span>
                                </div>
                                <div className="user-actions">
                                    <Link 
                                        to="/perfil" 
                                        className="user-action-btn"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        Mi Perfil
                                    </Link>
                                    <button className="user-action-btn">
                                        Mis Pedidos
                                    </button>
                                    <button className="user-action-btn">
                                        Direcciones
                                    </button>
                                    <button 
                                        className="user-action-btn logout"
                                        onClick={handleLogout}
                                    >
                                        <LogOut size={16} />
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button 
                        className="login-btn"
                        onClick={() => setIsAuthModalOpen(true)}
                    >
                        <User size={20} />
                        <span>Iniciar Sesión</span>
                    </button>
                )}

                <div className="cart-icon" onClick={onCartClick}>
                    <ShoppingCart size={24} />
                    <span className="cart-count">{cartCount}</span>
                </div>
            </div>

            <AuthModal 
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </header>
    );
}