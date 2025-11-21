import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, Headphones, Gift, Shirt, Scale, Grid, Home } from 'lucide-react';
import FlowingMenu from '../components/FlowingMenu/FlowingMenu';

export function HomePage({ onAddToCart }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const flowingMenuItems = [
    {
        link: "/regalos",
        text: "Regalos Exclusivos",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop"
    },
    {
        link: "/ropa", 
        text: "Moda Premium",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=200&fit=crop"
    },
    {
        link: "/servicios",
        text: "Servicios Legales", 
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop"
    },
    {
        link: "/catalogo",
        text: "Catálogo Completo",
        image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=300&h=200&fit=crop"
    }
    ];

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200&h=400&fit=crop",
            title: "Regalos Únicos para Momentos Especiales",
            subtitle: "Descubre nuestra colección de regalos perfectos para cada ocasión"
        },
        {
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
            title: "Moda que Expresa Tu Estilo",
            subtitle: "Ropa de calidad que se adapta a tu personalidad"
        },
        {
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=400&fit=crop",
            title: "Asesoría Legal Profesional",
            subtitle: "Servicios legales confiables cuando más los necesitas"
        }
    ];


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="homepage">
            {/* Hero Carousel */}
            <section className="hero-carousel">
                <div className="carousel-container">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="carousel-content">
                                <h1>{slide.title}</h1>
                                <p>{slide.subtitle}</p>
                                <div className="cta-buttons">
                                    <Link to="/catalogo" className="cta-button primary">
                                        <Grid size={20} style={{ marginRight: '8px' }} />
                                        Ver Catálogo
                                    </Link>
                                    <button 
                                        className="cta-button secondary" 
                                        onClick={() => {
                                            const categoriesSection = document.getElementById('categories');
                                            if (categoriesSection) {
                                                categoriesSection.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        Explorar Categorías
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-btn prev" onClick={prevSlide}>
                    <ChevronLeft size={32} />
                </button>
                <button className="carousel-btn next" onClick={nextSlide}>
                    <ChevronRight size={32} />
                </button>
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </section>

            {/* Flowing Menu Experience */}
            <section className="flowing-menu-section">
                <div className="container">
                    <div className="section-header">
                    <h2>Explora Nuestra Tienda</h2>
                    <p className="section-subtitle">
                    Una experiencia de navegación única con animaciones fluidas
                    </p>
                    </div>
                <FlowingMenu items={flowingMenuItems} />
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2>¿Por Qué Elegirnos?</h2>
                    <p className="section-subtitle">Calidad y confianza en cada compra</p>
                    <div className="features-grid">
                        <div className="feature-card">
                            <Truck size={48} className="feature-icon" />
                            <h3>Envío Rápido</h3>
                            <p>Entrega en 24-48 horas en toda la ciudad. Rastreo en tiempo real de tu pedido.</p>
                        </div>
                        <div className="feature-card">
                            <Shield size={48} className="feature-icon" />
                            <h3>Pago Seguro</h3>
                            <p>Transacciones protegidas y cifradas. Múltiples métodos de pago disponibles.</p>
                        </div>
                        <div className="feature-card">
                            <Headphones size={48} className="feature-icon" />
                            <h3>Soporte 24/7</h3>
                            <p>Estamos aquí para ayudarte cuando lo necesites. Atención personalizada.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Quiénes Somos</h2>
                            <p>
                                En <strong>Mi Tienda Online</strong>, nos dedicamos a ofrecer productos 
                                y servicios de la más alta calidad para hacer tu vida más especial. 
                                Desde 2020, hemos sido tu aliado confiable en regalos únicos, 
                                moda contemporánea y asesoría legal profesional.
                            </p>
                            <p>
                                Nuestra misión es brindarte una experiencia de compra excepcional, 
                                combinando la calidez del trato personal con la comodidad de la 
                                tecnología moderna. Cada producto y servicio es cuidadosamente 
                                seleccionado para garantizar tu completa satisfacción.
                            </p>
                            <div className="stats-grid">
                                <div className="stat">
                                    <h3>5000+</h3>
                                    <p>Clientes Satisfechos</p>
                                </div>
                                <div className="stat">
                                    <h3>3 Años</h3>
                                    <p>De Experiencia</p>
                                </div>
                                <div className="stat">
                                    <h3>100%</h3>
                                    <p>Garantía de Calidad</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-image">
                            <img 
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=500&fit=crop" 
                                alt="Nuestro equipo" 
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>¿Listo para Comenzar?</h2>
                        <p>Descubre nuestra amplia selección de productos y servicios diseñados para ti</p>
                        <div className="cta-buttons">
                            <Link to="/catalogo" className="cta-button primary">
                                <Grid size={20} style={{ marginRight: '8px' }} />
                                Explorar Catálogo
                            </Link>
                            <Link to="/" className="cta-button secondary">
                                <Home size={20} style={{ marginRight: '8px' }} />
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="container">
                    <h2>Lo Que Dicen Nuestros Clientes</h2>
                    <p className="section-subtitle">Experiencias reales de nuestra comunidad</p>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill="gold" />
                                ))}
                            </div>
                            <p>
                                "Excelente servicio! Los regalos llegaron a tiempo y perfectamente 
                                empacados. Definitivamente mi tienda favorita para detalles especiales."
                            </p>
                            <div className="client-info">
                                <strong>María González</strong>
                                <span>Cliente frecuente</span>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill="gold" />
                                ))}
                            </div>
                            <p>
                                "La asesoría legal fue profesional y resolvió todas mis dudas. 
                                Muy recomendable para servicios legales confiables y accesibles."
                            </p>
                            <div className="client-info">
                                <strong>Carlos Rodríguez</strong>
                                <span>Cliente de servicios</span>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill="gold" />
                                ))}
                            </div>
                            <p>
                                "La calidad de la ropa superó mis expectativas. Precios justos 
                                y entrega rápida. Volveré a comprar sin duda."
                            </p>
                            <div className="client-info">
                                <strong>Ana Martínez</strong>
                                <span>Compradora de moda</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;