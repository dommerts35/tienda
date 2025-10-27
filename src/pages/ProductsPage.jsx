import { useParams } from 'react-router-dom';
import { ProductList } from '../components/ProductList';

export function ProductsPage({ products, onAddToCart, categoryName }) {
    const { category } = useParams();

    const getPageTitle = () => {
        if (categoryName) return categoryName;
        if (category) {
            const categoryMap = {
                regalos: 'Regalos',
                ropa: 'Ropa',
                servicios: 'Servicios Legales'
            };
            return categoryMap[category] || 'Productos';
        }
        return 'Catálogo Completo';
    };

    const getPageDescription = () => {
        if (categoryName) return `Explora nuestra selección de ${categoryName.toLowerCase()}`;
        if (category) return `Descubre los mejores ${getPageTitle().toLowerCase()} para ti`;
        return 'Encuentra todo lo que buscas en nuestra tienda';
    };

    const filteredProducts = category 
        ? products.filter(product => product.category === category)
        : products;

    return (
        <div className="products-page">
            <div className="products-header">
                <h1>{getPageTitle()}</h1>
                <p>{getPageDescription()}</p>
            </div>
            <ProductList 
                products={filteredProducts}
                onAddToCart={onAddToCart}
            />
        </div>
    );
}