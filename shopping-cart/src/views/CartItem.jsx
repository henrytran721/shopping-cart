import React, { useState, useRef, useEffect } from 'react';

const CartItem = ({item, index, handleDelete, getData}) => {
    const [quantity, setQuantity] = useState(item.quantity);
    let shoeQuantity = useRef(null);

    function handleIncrease() {
        if(quantity >= 1) {
            setQuantity((prev) => prev + 1)
        }
    }

    useEffect(() => {
        // pass data from child to parent to be used
        let data = {quantity: quantity, item: item, index}
        getData(data);
    }, [quantity])

    function handleDecrease() {
        if(quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    return (
        <div class='order-summary_shoe' key={index}>
        <img src={item.img} />
        <div class='order-summary_description'>
            <h3>{item.model}</h3>
            <p>${item.price}</p>
            <div className='order-summary_quantity'>
            <span>
                <svg onClick={handleDecrease} id={index} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="25" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </span>
            <p ref={shoeQuantity}>{quantity}</p>
            <span>
                <svg onClick={handleIncrease} id={index} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="25" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
}

export default CartItem;