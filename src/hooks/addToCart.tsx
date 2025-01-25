interface Product {
    name: string;
    price: number;
}

interface CartItem {
    product: Product;
    quantity: number;
}

export const useAddToCart = () => {
    // Add product to cart
    const addToCart = (product: Product) => {
        const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = existingCart.find((item) => item.product.name === product.name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            existingCart.push({ product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
    };

    // Update cart with a new quantity
    const updateQuantity = (productName: string, newQuantity: number) => {
        const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = existingCart.map((item) =>
            item.product.name === productName
                ? { ...item, quantity: newQuantity }
                : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Remove item from the cart
    const removeFromCart = (productName: string) => {
        const existingCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = existingCart.filter((item) => item.product.name !== productName);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return { addToCart, updateQuantity, removeFromCart };
};
