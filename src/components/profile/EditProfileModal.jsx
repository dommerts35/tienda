import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, User, Mail, Phone } from 'lucide-react';

export function EditProfileModal({ isOpen, onClose }) {
    const { currentUser, updateProfile, loading } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                email: currentUser.email || '',
                phone: currentUser.phone || ''
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim() || !formData.email.trim()) {
            setError('Nombre y email son obligatorios');
            return;
        }

        const result = await updateProfile(formData);
        
        if (result.success) {
            setSuccess('Perfil actualizado correctamente');
            setTimeout(() => {
                onClose();
            }, 1500);
        } else {
            setError(result.error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay active" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                
                <div className="auth-modal">
                    <div className="auth-header">
                        <h2>Editar Perfil</h2>
                        <p>Actualiza tu información personal</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="auth-success">
                                {success}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">
                                <User size={18} />
                                Nombre completo *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tu nombre completo"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                <Mail size={18} />
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">
                                <Phone size={18} />
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1234567890"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="auth-button primary"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}