import React, { useState } from 'react';
import '../sass/index.scss';

const ShoppingCart = () => {
    let initialState = [
        {
            model: 'Nike Kobe 6 Proto Grinch', 
            img: 'https://stockx-360.imgix.net/Nike-Kobe-6-Protro-Grinch/Images/Nike-Kobe-6-Protro-Grinch/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1609445833&w=1000',
            price: 215,
            quantity: 1
        },
        {
            model: 'Nike Lebron 18 Kylian Mbappe',
            img: 'https://stockx-360.imgix.net/Nike-Lebron-18-Kylian-Mbappe/Images/Nike-Lebron-18-Kylian-Mbappe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1611164319&w=1000',
            price: 173,
            quantity: 1
        },
        {
            model: 'Nike KD 13 Aunt Pearl',
            img: 'https://images.stockx.com/images/Nike-KD-13-Aunt-Pearl-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&trim=color&updated_at=1607016174&w=1000',
            price: 165,
            quantity: 1
        },
        {
            model: 'UA Curry 8 Tie Dye Black',
            img: 'https://images.stockx.com/images/Under-Armour-Curry-8-Tie-Dye-Black.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&trim=color&updated_at=1607177072&w=1000',
            price: 157,
            quantity: 1
        }
    ]
    return (
        <div class='cart-container'>
            <nav>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="9" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
                </svg>
            </nav>
            <div className='item-container'>
                {initialState.map((shoe) => {
                    return (
                        <div className='shoe-container'>
                            <img className='shoe-container__img' src={shoe.img} />
                            <div className='shoe-container__description'>
                                <h2 className='shoe-container__model'>{shoe.model}</h2>
                                <p className='shoe-container__price'>${shoe.price}</p>
                                <button className='shoe-container__button'>Add to cart</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ShoppingCart;