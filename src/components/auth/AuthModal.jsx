import { useState } from 'react';
import { X } from 'lucide-react';
import { Login } from './Login';
import { Register } from './Register';

export function AuthModal({ isOpen, onClose }) {
    const [currentView, setCurrentView] = useState('login'); // 'login' or 'register'

    if (!isOpen) return null;

    const handleClose = () => {
        setCurrentView('login');
        onClose();
    };

    return (
        <div className="modal-overlay active" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>
                    <X size={24} />
                </button>
                
                {currentView === 'login' ? (
                    <Login 
                        onSwitchToRegister={() => setCurrentView('register')}
                        onClose={handleClose}
                    />
                ) : (
                    <Register 
                        onSwitchToLogin={() => setCurrentView('login')}
                        onClose={handleClose}
                    />
                )}
            </div>
        </div>
    );
}