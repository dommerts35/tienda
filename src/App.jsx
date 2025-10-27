import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProfilePage } from './pages/ProfilePage';
import { useCart } from './hooks/useCart';
import { products } from './data/products';
import './styles/App.css';

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const {
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice
    } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div className="App">
            <Header 
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
            />
            
            <main>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <HomePage 
                                onAddToCart={handleAddToCart}
                            />
                        } 
                    />
                    <Route 
                        path="/catalogo" 
                        element={
                            <ProductsPage 
                                products={products}
                                onAddToCart={handleAddToCart}
                            />
                        } 
                    />
                    <Route 
                        path="/categoria/:category" 
                        element={
                            <ProductsPage 
                                products={products}
                                onAddToCart={handleAddToCart}
                            />
                        } 
                    />
                    <Route 
                        path="/perfil" 
                        element={<ProfilePage />} 
                    />
                    <Route 
                        path="/regalos" 
                        element={
                            <ProductsPage 
                                products={products.filter(p => p.category === 'regalos')}
                                onAddToCart={handleAddToCart}
                                categoryName="Regalos"
                            />
                        } 
                    />
                    <Route 
                        path="/ropa" 
                        element={
                            <ProductsPage 
                                products={products.filter(p => p.category === 'ropa')}
                                onAddToCart={handleAddToCart}
                                categoryName="Ropa"
                            />
                        } 
                    />
                    <Route 
                        path="/servicios" 
                        element={
                            <ProductsPage 
                                products={products.filter(p => p.category === 'servicios')}
                                onAddToCart={handleAddToCart}
                                categoryName="Servicios Legales"
                            />
                        } 
                    />
                </Routes>
            </main>

            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                onClearCart={clearCart}
                getTotalPrice={getTotalPrice}
            />
        </div>
    );
}

export default App;