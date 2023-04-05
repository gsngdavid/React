import { useContext } from 'react';

import styles from './Cart.module.css';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

function Cart(props) {

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartHasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const  cartItems = <ul className={styles['cart-items']}>{cartCtx.items.map(item => 
        <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
    )}</ul>;

    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={styles.total}>
            <span>Total amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose} >Close</button>
            {cartHasItems && <button className={styles.button}>Order</button>}
        </div>
    </Modal>
}

export default Cart;












