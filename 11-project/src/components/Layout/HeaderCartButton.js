import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import styles from './HeaderCartButton.module.css';

function HeaderCartButton (props) {

    const cartCtx = useContext(CartContext);
    // const {items: cartItems} = cartCtx.items;
    
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0);

    const [isItemAdded, setIsItemAdded] = useState(false);

    const btnClasses = `${styles.button} ${isItemAdded ? styles.bump : ''}`;

    useEffect(()=> {
        if(cartCtx.items.length === 0) {
            return;
        }
        setIsItemAdded(true);

        const timer = setTimeout(() => {setIsItemAdded(false);}, 300);

        return () => {
            clearTimeout(timer);
        }

    }, [cartCtx.items]);


    return <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>Your cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
}
export default HeaderCartButton;