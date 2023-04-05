import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { receiveCartData, sendCartData } from './store/cart-slice';

let initial = true;

function App() {
  
  const dispatch = useDispatch();

  const cartIsShown = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  
  useEffect(() => {
    dispatch(receiveCartData());
  }, [dispatch]);

  useEffect(() => {
    
    if(initial) {
      initial = false;
      return;
    }
    
    if(cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {cartIsShown && <Cart status={cartIsShown} />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
