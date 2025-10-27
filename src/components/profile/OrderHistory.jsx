import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

// Datos de ejemplo para pedidos
const mockOrders = [
    {
        id: 'ORD-001',
        date: '2024-01-15',
        total: 125.99,
        status: 'completed',
        items: [
            { name: 'Juego de Tazas Personalizadas', quantity: 1, price: 25.99 },
            { name: 'Camiseta Básica Premium', quantity: 2, price: 29.99 }
        ]
    },
    {
        id: 'ORD-002',
        date: '2024-01-10',
        total: 75.00,
        status: 'shipped',
        items: [
            { name: 'Asesoría Legal Básica', quantity: 1, price: 50.00 },
            { name: 'Ramo de Flores Premium', quantity: 1, price: 25.00 }
        ]
    },
    {
        id: 'ORD-003',
        date: '2024-01-05',
        total: 59.99,
        status: 'processing',
        items: [
            { name: 'Jeans Clásicos', quantity: 1, price: 59.99 }
        ]
    }
];

const statusConfig = {
    completed: { label: 'Completado', icon: CheckCircle, color: '#27ae60' },
    shipped: { label: 'Enviado', icon: Truck, color: '#3498db' },
    processing: { label: 'Procesando', icon: Clock, color: '#f39c12' }
};

export function OrderHistory() {
    return (
        <div className="order-history">
            <div className="section-header">
                <h3>Historial de Pedidos</h3>
            </div>

            {mockOrders.length === 0 ? (
                <div className="empty-state">
                    <Package size={48} />
                    <h4>No tienes pedidos aún</h4>
                    <p>Cuando realices tu primer pedido, aparecerá aquí.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {mockOrders.map(order => {
                        const StatusIcon = statusConfig[order.status].icon;
                        const statusColor = statusConfig[order.status].color;
                        
                        return (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <h4>Pedido #{order.id}</h4>
                                        <p className="order-date">
                                            {new Date(order.date).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="order-total">
                                        ${order.total.toFixed(2)}
                                    </div>
                                </div>

                                <div className="order-status">
                                    <StatusIcon size={16} color={statusColor} />
                                    <span style={{ color: statusColor }}>
                                        {statusConfig[order.status].label}
                                    </span>
                                </div>

                                <div className="order-items">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <span className="item-name">
                                                {item.name} x{item.quantity}
                                            </span>
                                            <span className="item-price">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-actions">
                                    <button className="action-btn outline">
                                        Ver Detalles
                                    </button>
                                    <button className="action-btn primary">
                                        Volver a Pedir
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}