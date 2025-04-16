export interface User {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
    createdAt?: string;
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
    phoneNo?: string;
};

export type CartItem = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
};

export type OrderItem = {
    _id: string;
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
};

export type OrderType = {
    shippingInfo: ShippingInfo;
    orderItems: OrderItem[];
    status: string;
    subTotal: number;
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

type changePercent_counts = {
    revenue: number;
    products: number;
    users: number;
    orders: number;
};

type latestTransactions = {
    _id: string;
    discount: number;
    amount: number;
    quantity: number;
    status: string;
};

export type Statistics = {
    categories: string[];
    categoryCounts: Record<string, number>[];
    changePercent: changePercent_counts;
    counts: changePercent_counts;
    chart: {
        orders: number[];
        revenue: number[];
    };
    genderRatios: {
        male: number;
        female: number;
    };
    latestTransactions: latestTransactions[];
};

export type Pie = {
    orderFullfillment: {
        processing: number;
        shipped: number;
        delivered: number;
    };
    productCategories: Record<string, number>[];
    stockAvailability: {
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: {
        netMargin: number;
        discount: number;
        productionCost: number;
        burnt: number;
        marketingCost: number;
    };
    usersAgeGroup: {
        teen: number;
        adult: number;
        senior: number;
    };
    adminCustomers: {
        admin: number;
        customer: number;
    };
};

export type Bar = {
    users: number[];
    products: number[];
    orders: number[];
    twelveMonths: string[];
    sixMonths: string[];
};

export type Line = {
    users: number[];
    products: number[];
    revenue: number[];
    discount: number[];
    twelveMonths: string[];
};
