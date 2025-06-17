import { useState } from "react";

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
];

// 📌 Milestone 3: Modificare il carrello

// Al click successivo del bottone "Aggiungi al carrello", se il prodotto è già presente:
// Usa una funzione updateProductQuantity per incrementare la proprietà quantity del prodotto esistente.
// Per ogni prodotto nel carrello, aggiungi un bottone "Rimuovi dal carrello":
// Al click, usa una funzione removeFromCart per rimuovere il prodotto dal carrello.
// Sotto alla lista del carrello, mostra il totale da pagare:
// Calcola il totale moltiplicando il prezzo per la quantità di ogni prodotto e somma tutti i risultati.
// Obiettivo: Gestire l’aggiunta, la rimozione e il calcolo del totale del carrello in modo dinamico.

const ProductList = () => {
    const [addedProducts, setAddedProducts] = useState([]);


    // Funzione che aggiunge elementi al carrello solo se non sono già presenti
    const addToCart = (product) => {
        if (!addedProducts.some(p => p.name === product.name)) {
            setAddedProducts([...addedProducts, product])
        }
    }

    // Funzione per incrementare la quantità
    const updateProductQuantity = (product) => {
        // Prende l'array precedente e compara il prodotto passato con quelli già presenti
        // Se il prodotto corrisponde incrementa la quantità
        setAddedProducts(prevProducts => prevProducts.map(p =>
            p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        ))
    }

    // Funzione per rimuovere dal carrello
    const removeFromCart = (product) => {
        setAddedProducts(prevProducts => prevProducts.filter(p =>
            p.name !== product.name))
    }

    // Funzione per calcolare il totale
    const getTotal = (cart) => {
        return cart.reduce((acc, p) => acc + (p.quantity * p.price), 0);
    }

    return (
        <>
            <div className="product-list">
                {products.map(p => (
                    <div key={p.name} className="product-card">
                        <h3> {p.name} </h3>
                        <p> Prezzo: {(p.price).toFixed(2)}€ </p>
                        <button onClick={() => {
                            // Se il prodotto è già presente nel carrello esegue la funzione che ne incrementa la quantità
                            if (addedProducts.some(product => p.name === product.name)) {
                                updateProductQuantity(p);
                            }
                            // Altrimenti lo aggiunge al carrello
                            else {
                                addToCart({ ...p, quantity: 1 });
                            }
                        }}>
                            Aggiungi al carrello
                        </button>
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
                            <button onClick={() => removeFromCart(p)}>
                                Rimuovi dal carrello
                            </button>
                        </div>
                    ))}

                    <h2> Totale: {getTotal(addedProducts).toFixed(2)}€ </h2>

                </div>
            )}
        </>
    )
}



export default ProductList