import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {

  const cart = useSelector(items => items.cart);
  
  const items = cart.items.map(item =>
    <CartItem
          key={item.id}
          item={{ id: item.id, title: item.title, quantity: item.quantity, total: item.totalPrice, price: item.price }}
        />
    );

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items}
      </ul>
    </Card>
  );
};

export default Cart;
