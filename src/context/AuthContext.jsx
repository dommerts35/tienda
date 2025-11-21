import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simular datos de usuario (en un proyecto real esto vendría de una API)
    const mockUsers = [
        {
            id: 1,
            email: 'usuario@ejemplo.com',
            password: 'password123',
            name: 'Juan Pérez',
            phone: '+1234567890',
            addresses: [
                {
                    id: 1,
                    street: 'Calle Principal 123',
                    city: 'Ciudad de México',
                    state: 'CDMX',
                    zipCode: '12345',
                    isDefault: true
                }
            ]
        }
    ];

    useEffect(() => {
        // Verificar si hay usuario guardado en localStorage al cargar la app
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const user = mockUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                const userWithoutPassword = { ...user };
                delete userWithoutPassword.password;
                
                setCurrentUser(userWithoutPassword);
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                return { success: true };
            } else {
                return { success: false, error: 'Credenciales incorrectas' };
            }
        } catch (error) {
            return { success: false, error: 'Error al iniciar sesión' };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Verificar si el usuario ya existe
            const existingUser = mockUsers.find(u => u.email === userData.email);
            if (existingUser) {
                return { success: false, error: 'El email ya está registrado' };
            }

            // Crear nuevo usuario
            const newUser = {
                id: mockUsers.length + 1,
                ...userData,
                addresses: []
            };

            const userWithoutPassword = { ...newUser };
            delete userWithoutPassword.password;

            setCurrentUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Error al registrar usuario' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
    };

    const updateProfile = async (userData) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const updatedUser = {
                ...currentUser,
                ...userData
            };

            setCurrentUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Error al actualizar perfil' };
        } finally {
            setLoading(false);
        }
    };

    
    const addAddress = async (addressData) => {
    setLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newAddress = {
            id: Date.now(),
            ...addressData,
            isDefault: currentUser.addresses.length === 0
        };

        const updatedUser = {
            ...currentUser,
            addresses: [...currentUser.addresses, newAddress]
        };

        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Error al agregar dirección' };
    } finally {
        setLoading(false);
    }
};

const updateAddress = async (addressId, addressData) => {
    setLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const updatedUser = {
            ...currentUser,
            addresses: currentUser.addresses.map(addr =>
                addr.id === addressId ? { ...addr, ...addressData } : addr
            )
        };

        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Error al actualizar dirección' };
    } finally {
        setLoading(false);
    }
};

const deleteAddress = async (addressId) => {
    setLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const updatedUser = {
            ...currentUser,
            addresses: currentUser.addresses.filter(addr => addr.id !== addressId)
        };

        if (updatedUser.addresses.length > 0 && !updatedUser.addresses.find(addr => addr.isDefault)) {
            updatedUser.addresses[0].isDefault = true;
        }

        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Error al eliminar dirección' };
    } finally {
        setLoading(false);
    }
};

const setDefaultAddress = async (addressId) => {
    setLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const updatedUser = {
            ...currentUser,
            addresses: currentUser.addresses.map(addr => ({
                ...addr,
                isDefault: addr.id === addressId
            }))
        };

        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Error al establecer dirección por defecto' };
    } finally {
        setLoading(false);
    }
};


    const value = {
        currentUser,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        loading
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}