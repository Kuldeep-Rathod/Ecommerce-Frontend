export interface User {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
}

export interface Product {
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
}

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    phoneNo?: number;
};

export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
};

export type OrderItem = Omit<CartItem, 'stock'> & { _id: string };

export type OrderType = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    status: 'Processing' | 'Shipped' | 'Delivered';
    subtotal: number;
    discount: number;
    shippingCharges: number;
    tax: number;
    total: number;
    user: {
        name: string;
        _id: string;
    };
    _id: string;
};
