import { useContext, useRef } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";


const Checkout = props => {
    const classes = './Checkout.module.css';
    
    const names = useRef();
    const cartCtx = useContext(CartContext);
    
    const checkoutHandler = async (name) => {
        console.log(name);
        const orderItems = cartCtx.items.map(item => {
          return {id: item.id, amount: item.amount}
        });
        
        try {
          const response = await fetch("http://localhost:4000/order", {
            method: 'POST',
            body: JSON.stringify({names: name, items: orderItems}),
            headers: {'Content-Type': 'application/json'}
          });
      
          if(!response.ok) {
            throw new Error("Something went wrong.");
          }
          const data = await response.json();
    
          console.log(data);
    
        } catch(error) {
          console.log(error);
        }
    
      }

    const checkoutSubmitHandler = (event) => {
        event.preventDefault();
        checkoutHandler(names.current.value);
    }
    return (
        <Modal onClose={props.onClose}>
            <h3>Checkout</h3>
            <form onSubmit={checkoutSubmitHandler}>
                <div className={classes.control}>
                    <label htmlFor="names">Names</label>
                    <input ref={names} id="names" type="text" />
                </div>
                <div className={classes.control}>
                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" />
                </div>
                <div className={classes.control}>
                    <label htmlFor="postal">Postal Code</label>
                    <input id="postal" type="text" />
                </div>
                <div className={classes.control}>
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" />
                </div>
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{cartCtx.totalAmount}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onClose}>
                    Close
                    </button>
                    <button type="submit" className={classes.button}>Checkout</button>
                </div>
            </form>
        </Modal>
    );
}

export default Checkout;