import React, { useState, useEffect } from 'react';
import '../sass/index.scss';
import CartItem from './CartItem';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    useEffect(() => {
        if(localStorage.getItem('cart')) {
            const storageCart = JSON.parse(localStorage.getItem('cart'));
            setCart(storageCart);
        }
    }, [])

    useEffect(() => {
        var sum = 0;
        var total = 0;
        if(cart.length) {
            cart.map((item) => {
                sum += item.quantity * item.price;
                total += item.quantity;
            })
        }
        setTotal(sum);
        setTotalQuantity(total);
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    function handleDelete(e)  {
        const index = parseInt(e.target.id);
        setCart(prevCart => prevCart.filter((item) => item.id !== index));
    }

    function getData(data) {
        // extract data from child component in order to update quantity in state
        let currentItem = data.item;
        let index = data.index;
        currentItem.quantity = data.quantity;

        setCart((prevState) => {
            if(index === 0) {
                return [currentItem, ...prevState.slice(1)];
            } else if(index === prevState.length - 1) {
                return [...prevState.slice(0, index), currentItem];
            } else {
                return [...prevState.slice(0, index), currentItem, ...prevState.slice(index + 1)]
            }
           })
    }

    return (
        <div className='cart-container'>
            {cart.length > 0 ? 
            <div>
            <nav>
                <a href='/cart'><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="9" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
                </svg>
                </a>
                <p>{cart.length}</p>
            </nav>
            <div class='order-summary'>
                <div class='order-summary_cart'>
                    <h2>Your Cart</h2>
                    {cart.map((item, index) => {
                        return (
                            <CartItem item={item} handleDelete={handleDelete} index={index} getData={getData} />
                        )
                    })}
                </div>
                <div class='order-summary_total'>
                    <h2>Order Total</h2>
                    <div class='total-item-price'>
                        {cart.length === 1 ? <p>1 Item</p> : <p>{totalQuantity} Items</p>}
                        <p>${total}</p>
                    </div>
                    <div class='total-summary'>
                        <p>Total</p>
                        <p>${total}</p>
                    </div>
                </div>
            </div>
            </div> : 
            <div className='empty-cart'>
                <nav>
                    <a href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <polyline points="5 12 3 12 12 3 21 12 19 12" />
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                    </a>
                </nav>
                <p>There doesn't seem to be anything in your cart. Please add something and try again.</p>
            </div>
            }
        </div>
    )
}

export default Cart;