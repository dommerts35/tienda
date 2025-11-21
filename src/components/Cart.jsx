import { X, Plus, Minus, Trash2 } from 'lucide-react';

export function Cart({ isOpen, onClose, cart, onUpdateQuantity, onRemoveFromCart, onClearCart, getTotalPrice }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="cart-overlay active" onClick={onClose}></div>
            <div className="cart-sidebar active">
                <div className="cart-header">
                    <h2>Tu Carrito</h2>
                    <button className="close-cart" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                
                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p className="empty-cart">Tu carrito está vacío</p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p>${item.price.toFixed(2)} c/u</p>
                                </div>
                                <div className="cart-item-controls">
                                    <button 
                                        className="quantity-btn" 
                                        onClick={() => onUpdateQuantity(item.id, -1)}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button 
                                        className="quantity-btn" 
                                        onClick={() => onUpdateQuantity(item.id, 1)}
                                    >
                                        <Plus size={16} />
                                    </button>
                                    <button 
                                        className="remove-btn" 
                                        onClick={() => onRemoveFromCart(item.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                <div className="cart-total">
                    <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
                    <p>{cart.length} productos en el carrito</p>
                </div>
                
                {cart.length > 0 && (
                    <>
                        <button className="checkout-btn" onClick={() => alert('¡Gracias por tu compra! En una próxima fase, esto procesaría el pago.')}>
                            Finalizar Compra
                        </button>
                        <button className="clear-cart-btn" onClick={onClearCart}>
                            Vaciar Carrito
                        </button>
                    </>
                )}
            </div>
        </>
    );
}