import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface CartItem {
    product: {
        name: string;
        price: number;
        ingredients?: string[];
    };
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    isCartPage: boolean;
    setCart: (cart: CartItem[]) => void;
    updateCartItem: (name: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const location = useLocation(); // Detect current route

    useEffect(() => {
        // Load cart from localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(storedCart);
    }, []);

    useEffect(() => {
        // Remove items with quantity === 0 if on the cart page
        if (location.pathname === '/cart') {
            const filteredCart = cart.filter((item) => item.quantity > 0);
            if (filteredCart.length !== cart.length) {
                setCart(filteredCart);
                localStorage.setItem('cart', JSON.stringify(filteredCart));
            }
        }
    }, [location, cart]);

    const updateCartItem = (name: string, quantity: number) => {
        const updatedCart = cart.map((item) =>
            item.product.name === name ? { ...item, quantity } : item
        ).filter((item) => item.quantity > 0); // Remove items with quantity === 0

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{ cart, setCart, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
