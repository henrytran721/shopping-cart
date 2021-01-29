import React, { useState, useEffect } from 'react';
import '../sass/index.scss';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        if(localStorage.getItem('cart')) {
            const storageCart = JSON.parse(localStorage.getItem('cart'));
            setCart(storageCart);
        }
    }, [])

    useEffect(() => {
        var sum = 0;
        if(cart.length) {
            cart.map((item) => {
                sum += item.quantity * item.price;
            })
        }
        setTotal(sum);
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    function handleDelete(e)  {
        const index = parseInt(e.target.id);
        setCart(prevCart => prevCart.filter((item) => item.id !== index));
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
                            <div class='order-summary_shoe' key={index}>
                                <img src={item.img} />
                                <div class='order-summary_description'>
                                    <h3>{item.model}</h3>
                                    <p>${item.price}</p>
                                    <div className='order-summary_quantity'>
                                    <span>
                                        <svg id={index} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="25" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </span>
                                    <p>{item.quantity}</p>
                                    <span>
                                        <svg id={index} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="25" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </span>
                                    </div>
                                    <button id={item.id} className='order-summary_delete' onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div class='order-summary_total'>
                    <h2>Order Total</h2>
                    <div class='total-item-price'>
                        {cart.length === 1 ? <p>1 Item</p> : <p>{cart.length} Items</p>}
                        <p>${total}</p>
                    </div>
                    <div class='total-summary'>
                        <p>Total</p>
                        <p>${total}</p>
                    </div>
                </div>
            </div>
            </div> : 'hello'}
        </div>
    )
}

export default Cart;