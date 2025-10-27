import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

export function Register({ onSwitchToLogin, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const { register, loading } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Por favor completa todos los campos obligatorios');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const result = await register({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        });

        if (result.success) {
            onClose?.();
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="auth-modal">
            <div className="auth-header">
                <h2>Crear Cuenta</h2>
                <p>Únete a nuestra comunidad</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {error && (
                    <div className="auth-error">
                        {error}
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

                <div className="form-group">
                    <label htmlFor="password">
                        <Lock size={18} />
                        Contraseña *
                    </label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        <Lock size={18} />
                        Confirmar contraseña *
                    </label>
                    <div className="password-input">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repite tu contraseña"
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="auth-button primary"
                    disabled={loading}
                >
                    {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>
            </form>

            <div className="auth-footer">
                <p>
                    ¿Ya tienes cuenta?{' '}
                    <button 
                        type="button" 
                        className="auth-link"
                        onClick={onSwitchToLogin}
                    >
                        Inicia sesión aquí
                    </button>
                </p>
            </div>
        </div>
    );
}