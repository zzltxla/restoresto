import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout';
import { Footer } from '../components/Layout';
import { ProductCard } from '../components/product/ProductCard';
import { RequireAuth } from '../utility/requireAuth';
import { useCart } from '../context/CartContext'; 

export const Cart = () => {
    const { cart, setCart } = useCart(); // Using CartContext
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        alert('Proceeding to checkout');
        localStorage.removeItem('cart'); // Clear local storage
        setCart([]); 
        navigate('/');
    };


    return (
        <RequireAuth>
            <>
                <Header title="cart" />
                <main id="cart-container">
                    <h1>Your Cart</h1>
                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <ul>
                            {cart.map((item) => (
                                <li key={item.product.name}>
                                    <ProductCard
                                        name={item.product.name}
                                        ingredients={item.product.ingredients}
                                        price={item.product.price}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                    <button onClick={handleCheckout}>Checkout</button>
                    <button onClick={() => navigate('/')}>Back to Home</button>
                </main>
                <Footer />
            </>
        </RequireAuth>
    );
};
