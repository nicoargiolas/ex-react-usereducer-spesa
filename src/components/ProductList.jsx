import { useState } from "react";

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];



// Crea un componente che mostra la lista dei prodotti.
// Per ogni prodotto, mostra:
// Nome
// Prezzo

// Obiettivo: Vedere un elenco leggibile di tutti i prodotti con nome e prezzo.

const ProductList = () => {
    const [addedProducts, setAddedProducts] = useState([]);


    // Funzione che aggiunge elementi al carrello solo se non sono già presenti
    const addToCart = (product) => {
        if (!addedProducts.some(p => p.name === product.name)) {
            setAddedProducts([...addedProducts, product])
        }
    }

    return (
        <>
            <div className="product-list">
                {products.map(p => (
                    <div key={p.name} className="product-card">
                        <h3> {p.name} </h3>
                        <p> Prezzo: {(p.price).toFixed(2)}€ </p>
                        <button onClick={() => addToCart({ ...p, quantity: 1 })}> Aggiungi al carrello </button>
                    </div>
                ))}
            </div>


            {addedProducts.length > 0 && (
                <div className="cart">
                    <h1> Carrello </h1>

                    {addedProducts.map(p => (
                        <div key={p.name} className="cart-card">
                            <h3> {p.name} </h3>
                            <p> Prezzo: {(p.price).toFixed(2)}€ </p>
                            <p> Quantità: {p.quantity} </p>
                        </div>
                    ))}

                </div>
            )}
        </>
    )
}

export default ProductList