import { ProductCard } from './ProductCard';

export function ProductList({ products, onAddToCart }) {
    return (
        <section className="products">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={onAddToCart}
                />
            ))}
        </section>
    );
}