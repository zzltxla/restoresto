import { useState, useEffect } from 'react';

interface Product {
    name: string;
    ingredients: string[];
    price: number;
    type: string;
}

export const useFetchProductsByType = (type: string) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5055/products?type=${type}`); 
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [type]);

    return { products, loading, error };
};
