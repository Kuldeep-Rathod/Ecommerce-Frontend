import React, { useState } from 'react';

interface Product {
    _id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    description: string;
    features: string[];
    colors: string[];
    images: string[];
    category: string;
    stock: number;
    rating: number;
    reviews: number;
}

const ProductPage: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState<string>('Black');
    const [mainImage, setMainImage] = useState<string>(
        'https://res.cloudinary.com/djsewrcyo/image/upload/v1726149377/cld-sample-3.jpg'
    );

    const product: Product = {
        _id: 1,
        name: 'Premium Wireless Headphones Pro X',
        brand: 'AudioMaster',
        price: 199.99,
        originalPrice: 249.99,
        description:
            'Experience crystal-clear sound with our Premium Wireless Headphones Pro X. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day listening.',
        features: [
            'Active Noise Cancellation technology',
            '30-hour battery life with quick charge',
            'Premium memory foam ear cushions',
            'Bluetooth 5.0 with 30m range',
            'Built-in microphone for calls',
            'Foldable design with travel case',
        ],
        colors: ['Black', 'White', 'Blue', 'Red'],
        images: [
            'https://res.cloudinary.com/djsewrcyo/image/upload/v1726149377/cld-sample-4.jpg',
            'https://res.cloudinary.com/djsewrcyo/image/upload/v1726149377/cld-sample-5.jpg',
            'https://res.cloudinary.com/djsewrcyo/image/upload/v1726149377/cld-sample-2.jpg',
            'https://res.cloudinary.com/djsewrcyo/image/upload/v1726149377/cld-sample.jpg',
            'https://res.cloudinary.com/djsewrcyo/image/upload/v1726149377/cld-sample-3.jpg',
        ],
        category: 'category',
        rating: 4.5,
        reviews: 142,
        stock: 5,
    };

    const handleThumbnailClick = (img: string) => {
        setMainImage(img.replace('200x200', '800x800'));
    };

    const discountPercentage = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    const getColorClass = (color: string) => {
        return color.toLowerCase() + '-color';
    };

    return (
        <div className='product-container'>
            <aside className='product-gallery'>
                <div className='main-image-container'>
                    <img
                        src={mainImage}
                        alt={product.name}
                        className='main-image'
                    />
                </div>
                <div className='thumbnail-container'>
                    {product.images.slice(1).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${product.name} angle ${index + 1}`}
                            className={`thumbnail ${
                                mainImage === img.replace('200x200', '800x800')
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() => handleThumbnailClick(img)}
                        />
                    ))}
                </div>
                <div className='action-buttons'>
                    <button className='btn btn-primary'>
                        <i className='fas fa-shopping-cart'></i> Add to Cart
                    </button>
                    <button className='btn btn-secondary'>
                        <i className='fas fa-bolt'></i> Buy Now
                    </button>
                </div>
            </aside>

            <main className='product-info'>
                <div className='product-header'>
                    <h1 className='product-title'>{product.name}</h1>
                    <div className='product-brand'>{product.brand}</div>
                </div>

                <div className='price-container'>
                    <span className='current-price'>
                        ${product.price.toFixed(2)}
                    </span>
                    <span className='original-price'>
                        ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className='discount-badge'>
                        {discountPercentage}% OFF
                    </span>
                </div>
                <div className='rating'>
                    <a
                        href='#reviews'
                        className='review-count'
                    >
                        {product.reviews} reviews
                    </a>
                </div>

                <div className='availability'>
                    <i className='fas fa-check-circle'></i> Only {product.stock}{' '}
                    left in stock
                </div>

                <div className='product-description'>{product.description}</div>

                <div className='features'>
                    <h3 className='section-title'>
                        <i className='fas fa-bolt'></i> Key Features
                    </h3>
                    <ul className='features-list'>
                        {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div className='color-options'>
                    <h3 className='section-title'>
                        <i className='fas fa-palette'></i> Color Options
                    </h3>
                    <div className='color-selector'>
                        {product.colors.map((color) => (
                            <div
                                key={color}
                                className={`color-option ${getColorClass(
                                    color
                                )} ${
                                    selectedColor === color ? 'selected' : ''
                                }`}
                                title={color}
                                onClick={() => setSelectedColor(color)}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className='info-cards'>
                    <div className='info-card'>
                        <h3 className='section-title'>
                            <i className='fas fa-truck'></i> Delivery
                            Information
                        </h3>
                        <p>
                            Free standard shipping on all orders. Expected
                            delivery: 2-3 business days. Express shipping
                            available at checkout.
                        </p>
                    </div>

                    <div className='info-card'>
                        <h3 className='section-title'>
                            <i className='fas fa-undo'></i> Returns & Warranty
                        </h3>
                        <p>
                            30-day free returns. 1-year manufacturer warranty
                            included.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductPage;
