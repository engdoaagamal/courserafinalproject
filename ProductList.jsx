import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css'; // Assuming styles are defined here

const ProductList = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);

    // Sample data for plants category as per IBM project structure
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921", cost: "$15", description: "Produces oxygen at night, improving sleep." },
                { name: "Spider Plant", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce", cost: "$12", description: "Filters formaldehyde and xylene from the air." }
            ]
        },
        {
            category: "Aromatic Houseplants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a", cost: "$20", description: "Calming scent that helps reduce stress and anxiety." },
                { name: "Jasmin", image: "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab", cost: "$18", description: "Beautiful sweet fragrance that refreshes the room." }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div className="product-list-container">
            <nav className="navbar">
                <div className="navbar-brand">Paradise Nursery</div>
                <div className="navbar-links">
                    <button className="cart-icon-btn" onClick={() => setShowCart(true)}>
                        Cart ({calculateTotalItems()})
                    </button>
                </div>
            </nav>

            <div className="product-grid">
                {plantsArray.map((categoryObj, idx) => (
                    <div key={idx} className="category-section">
                        <h2>{categoryObj.category}</h2>
                        <div className="plants-list">
                            {categoryObj.plants.map((plant, pIdx) => {
                                const isAdded = cartItems.some(item => item.name === plant.name);
                                return (
                                    <div key={pIdx} className="plant-card">
                                        <img src={plant.image} alt={plant.name} className="plant-image" />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p className="plant-cost">{plant.cost}</p>
                                        <button 
                                            className={`add-to-cart-btn ${isAdded ? 'disabled' : ''}`}
                                            disabled={isAdded}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {isAdded ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
