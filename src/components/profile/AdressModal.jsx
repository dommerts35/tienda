import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, MapPin } from 'lucide-react';

export function AddressModal({ isOpen, onClose, address }) {
    const { addAddress, updateAddress, loading } = useAuth();
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (address) {
            setFormData({
                street: address.street || '',
                city: address.city || '',
                state: address.state || '',
                zipCode: address.zipCode || '',
                isDefault: address.isDefault || false
            });
        } else {
            setFormData({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                isDefault: false
            });
        }
        setError('');
    }, [address, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.street.trim() || !formData.city.trim() || !formData.state.trim() || !formData.zipCode.trim()) {
            setError('Todos los campos son obligatorios');
            return;
        }

        const result = address 
            ? await updateAddress(address.id, formData)
            : await addAddress(formData);
        
        if (result.success) {
            onClose();
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
                        <h2>{address ? 'Editar Dirección' : 'Agregar Dirección'}</h2>
                        <p>{address ? 'Actualiza tu dirección' : 'Agrega una nueva dirección de envío'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="street">
                                <MapPin size={18} />
                                Dirección *
                            </label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Calle y número"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">
                                Ciudad *
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Ciudad"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">
                                Estado/Provincia *
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Estado o provincia"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="zipCode">
                                Código Postal *
                            </label>
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                placeholder="Código postal"
                                required
                            />
                        </div>

                        {!address && (
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={formData.isDefault}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Establecer como dirección principal
                                </label>
                            </div>
                        )}

                        <div className="form-actions">
                            <button 
                                type="button" 
                                className="auth-button secondary"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="auth-button primary"
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : (address ? 'Actualizar' : 'Agregar')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}