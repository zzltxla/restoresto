import { ProductCard } from "../components/product/ProductCard";
import { useParams } from 'react-router';
import { useFetchProductsByType } from "../hooks/fetchProductsByType";
import { Header, Footer } from "../components/Layout";

export default function ProductPage () {

    const { type } = useParams<{ type: string }>()!;
    const categoryType = type || "default";

    const { products, loading, error } = useFetchProductsByType(categoryType || ""); 

    if (loading) return <p>Loading</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header title={categoryType}/>
            <main id="product-main">
                <h1>{type ? `${categoryType[0].toUpperCase() + categoryType.slice(1)} Dishes` : "Dishes"}</h1>
                {products.length === 0 ? (
                    <p>No products available for this category.</p>
                ) : (
                    <div className="product-container">
                        {products.map((product) => (
                            <ProductCard
                                key={product.name}
                                name={product.name}
                                price={product.price}
                                ingredients={product.ingredients.join(", ")}
                            />
                        ))}
                    </div>
                )}
            </main>
            <Footer/>
        </>
    )
}