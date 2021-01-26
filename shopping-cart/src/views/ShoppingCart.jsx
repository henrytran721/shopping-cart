import React, { useState, useEffect } from 'react';
import '../sass/index.scss';

const ShoppingCart = () => {
    let initialState = [
        {
            id: 0,
            model: 'Nike Kobe 6 Proto Grinch', 
            img: 'https://stockx-360.imgix.net/Nike-Kobe-6-Protro-Grinch/Images/Nike-Kobe-6-Protro-Grinch/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1609445833&w=1000',
            price: 215,
            quantity: 1
        },
        {
            id: 1,
            model: 'Nike Lebron 18 Kylian Mbappe',
            img: 'https://stockx-360.imgix.net/Nike-Lebron-18-Kylian-Mbappe/Images/Nike-Lebron-18-Kylian-Mbappe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1611164319&w=1000',
            price: 173,
            quantity: 1
        },
        {
            id: 2,
            model: 'Nike KD 13 Aunt Pearl',
            img: 'https://images.stockx.com/images/Nike-KD-13-Aunt-Pearl-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&trim=color&updated_at=1607016174&w=1000',
            price: 165,
            quantity: 1
        },
        {
            id: 3,
            model: 'UA Curry 8 Tie Dye Black',
            img: 'https://images.stockx.com/images/Under-Armour-Curry-8-Tie-Dye-Black.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&trim=color&updated_at=1607177072&w=1000',
            price: 157,
            quantity: 1
        }
    ]
    const [cartVal, setCartVal] = useState(0);
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState(initialState);

    function addQuantity(e) {
        let index = parseInt(e.target.id);
        let modifiedItem = items.find(item => item.id === index);
        let newItem;
        if(modifiedItem) {
            newItem = Object.assign({}, modifiedItem);
            newItem.quantity += 1;
        }
        // merge with state
        setItems((prevState) => {
         if(index === 0) {
             return [newItem, ...prevState.slice(1)];
         } else if(index === prevState.length - 1) {
             return [...prevState.slice(0, index), newItem];
         } else {
             return [...prevState.slice(0, index), newItem, ...prevState.slice(index + 1)]
         }
        })
    }

    function subtractQuantity(e) {
        let index = parseInt(e.target.id);
        const modifiedItem = items.find(item => item.id === index);
        let newItem;
        // make sure we find modifiedItem
        if(modifiedItem) {
            newItem = Object.assign({}, modifiedItem);
            if(newItem.quantity > 1) {
                newItem.quantity -= 1;
            }
        }
        
        // merge with state
        setItems((prevState) => {
         if(index === 0) {
             return [newItem, ...prevState.slice(1)];
         } else if(index === prevState.length - 1) {
             return [...prevState.slice(0, index - 1), newItem];
         } else {
             return [...prevState.slice(0, index), newItem, ...prevState.slice(index + 1)]
         }
        })
    }

    // add item to cart
    function addToCart(e) {
        let index = parseInt(e.target.id);
        const addedItem = items.find((item) => item.id === index);
        const foundInCart = cart.find((item) => item.id === index);
        // if item is already in cart, increment it in the cart instead of adding another asset
        if(foundInCart) {
            foundInCart.quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log(cart);
        } else {
            setCartVal((prev) => prev + 1);
            setCart((prevState) => [...prevState, addedItem]);
        }
    }

    // componentDidMount runs once and sets desired information where it needs to be
    useEffect(() => {
        if(localStorage.getItem('cart')) {
            var storageCart = localStorage.getItem('cart');
            storageCart = JSON.parse(storageCart);
            setCart(storageCart);
            setCartVal(storageCart.length);
        }
    }, [])

    // whenever cart updates, update localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    return (
        <div class='cart-container'>
            <nav>
                <a href='/cart'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="9" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
                </svg>
                </a>
                <p>{cartVal}</p>
            </nav>
            <div className='item-container'>
                {items.map((shoe, index) => {
                    return (
                        <div className='shoe-container' key={index}>
                            <img className='shoe-container__img' src={shoe.img} />
                            <div className='shoe-container__description'>
                                <h2 className='shoe-container__model'>{shoe.model}</h2>
                                <p className='shoe-container__price'>${shoe.price}</p>
                                <div className='shoe-container__quantity'>
                                    <span>
                                        <svg id={index} onClick={subtractQuantity} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="25" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </span>
                                    <p>{shoe.quantity}</p>
                                    <span>
                                        <svg id={index} onClick={addQuantity} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="25" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </span>
                                </div>
                                <button className='shoe-container__button' id={index} onClick={addToCart}>Add to cart</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShoppingCart;