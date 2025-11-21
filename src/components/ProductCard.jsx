import { Link } from 'react-router-dom';

export function ProductCard({ product, onAddToCart }) {
    const handleImageError = (e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
    };

    return (
        <div className="product" data-category={product.category}>
            <Link to={`/categoria/${product.category}`} className="product-category-link">
                <div className="category">{product.category.toUpperCase()}</div>
            </Link>
            
            <div className="product-image-container">
                <img 
                    src={product.image} 
                    alt={product.name}
                    onError={handleImageError}
                />
                <div className="product-image-placeholder" style={{ display: 'none' }}>
                    <span>{product.name}</span>
                </div>
            </div>
            
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price.toFixed(2)}</div>
            <button 
                className="add-to-cart" 
                onClick={() => onAddToCart(product)}
            >
                Agregar al Carrito
            </button>
        </div>
    );
}