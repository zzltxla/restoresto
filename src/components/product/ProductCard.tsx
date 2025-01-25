import { Buttons } from "../ui/buttons/Buttons";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

interface Props {
    name: string;
    price: number;
    ingredients: string[] ;
}

export const ProductCard = ({ name, price, ingredients }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { cart, setCart } = useCart();
    const [cartQuantity, setCartQuantity] = useState<number>(0);

    useEffect(() => { 
        
        const user = localStorage.getItem("user");
        setIsAuthenticated(!!user);
        
        //check if product is in the cart 
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItem = cart.find((item: { product: { name: string } }) => item.product.name === name);
        setCartQuantity(existingItem ? existingItem.quantity : 0);
    }, [cart, name]);

    const handleAddToCart = () => {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find((item) => item.product.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            updatedCart.push({
                product: { name, price, ingredients },
                quantity: 1,
            });
        }

        setCart(updatedCart); 
        localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    };

    const handleRemoveFromCart = () => {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find((item) => item.product.name === name);
    
        if (existingItem) {
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                // Remove the item if the quantity is 1
                const index = updatedCart.indexOf(existingItem);
                updatedCart.splice(index, 1);
            }
        }
    
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    };

    return (
        <article className="product-card">
            <div className="product-info--static">
                <h3>{name}</h3>
                <p className='product-info'>{ingredients}</p>
                <h4>{price} $</h4>
            </div>
            { isAuthenticated ? (
                <div className="update-cart--buttons">
                    {cartQuantity > 0 && ( //if product in cart show remove button to from cart 
                        <>
                            <p className='product-quantity'>{cartQuantity}</p>
                            <Buttons 
                            variant="remove" 
                            onClick={handleRemoveFromCart}
                            />
                        </>
                    )}
                    <Buttons 
                    variant="add" 
                    onClick={handleAddToCart}
                    />
                </div>
            ) : (
                <div></div>
            ) }
        </article>
    )
}
