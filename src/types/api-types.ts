import {
    Bar,
    CartItem,
    Line,
    OrderType,
    Pie,
    Product,
    ShippingInfo,
    Statistics,
    User,
    WishlistItem,
} from './types';

export type CustomError = {
    status: number;
    data: {
        message: string;
        success: boolean;
    };
};

export interface CartItemApi {
    _id: string;
    id: string;
    productId: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
    stock: number;
    addedAt: string;
}

export interface CartApi {
    _id: string;
    id: string;
    user: string;
    cartItems: CartItemApi[];
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetCartResponse {
    success: boolean;
    cart: CartApi;
}

export type MessageResponse = {
    success: boolean;
    message: string;
};

export type StatsResponse = {
    success: boolean;
    Statistics: Statistics;
};

export type PieResponse = {
    success: boolean;
    pieCharts: Pie;
};

export type BarResponse = {
    success: boolean;
    barCharts: Bar;
};

export type LineResponse = {
    success: boolean;
    lineCharts: Line;
};

export type AllUsersResponse = {
    success: boolean;
    users: User[];
};

export type UserResponse = {
    success: boolean;
    user: User;
};

export type AllProductResponse = {
    success: boolean;
    products: Product[];
};

export type CategoriesResponse = {
    success: boolean;
    categories: string[];
};

export type SearchProductResponse = AllProductResponse & {
    totalPage: number;
};

export type productResponse = {
    success: boolean;
    product: Product;
};

export type AllOrderResponse = {
    success: boolean;
    orders: OrderType[];
};

export type OrderDetailsResponse = {
    success: boolean;
    order: OrderType;
};

export interface WishlistResponse {
    success: boolean;
    items: WishlistItem[];
}

//Requests
export interface UpsertCartRequest {
    userId: string;
    cartItems: {
        productId: string;
        quantity: number;
    }[];
}

export interface DecreaseQuantityRequest {
    userId: string;
    productId: string;
    action: string;
}

export type NewProductRequest = {
    id: string;
    formData: FormData;
};

export type ToggleWishlistRequest = {
    productId: string;
    userId: string;
};

export type UpdateProductRequest = {
    userId: string;
    productId: string;
    formData: FormData;
};

export type DeleteProductRequest = {
    userId: string;
    productId: string;
};

export type SearchProductRequest = {
    price: number;
    page: number;
    category: string;
    search: string;
    sort: string;
};

export type NewOrderRequest = {
    shippingInfo: ShippingInfo;
    orderItems: CartItem[];
    subTotal: number;
    discount: number;
    shippingCharges: number;
    tax: number;
    total: number;
    user: string;
};

export type UpdateOrderRequest = {
    userId: string;
    orderId: string;
};

export type DeleteUserRequest = {
    userId: string;
    adminUserId: string;
};
