import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export function Login({ onSwitchToRegister, onClose }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, loading } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            setError('Por favor completa todos los campos');
            return;
        }

        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            onClose?.();
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="auth-modal">
            <div className="auth-header">
                <h2>Iniciar Sesión</h2>
                <p>Bienvenido de nuevo</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">
                        <Mail size={18} />
                        Email
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
                    <label htmlFor="password">
                        <Lock size={18} />
                        Contraseña
                    </label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Tu contraseña"
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

                <button 
                    type="submit" 
                    className="auth-button primary"
                    disabled={loading}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>

            <div className="auth-footer">
                <p>
                    ¿No tienes cuenta?{' '}
                    <button 
                        type="button" 
                        className="auth-link"
                        onClick={onSwitchToRegister}
                    >
                        Regístrate aquí
                    </button>
                </p>
            </div>
        </div>
    );
}