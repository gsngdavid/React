import classes from './Header.module.css';
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

  const isAuthenticated = useSelector(state => state.authObj.isAuthenticated);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const navigation = <nav>
    <ul>
      <li>
        <a href='/'>My Products</a>
      </li>
      <li>
        <a href='/'>My Sales</a>
      </li>
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    </ul>
  </nav>

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuthenticated && navigation}
    </header>
  );
};

export default Header;
