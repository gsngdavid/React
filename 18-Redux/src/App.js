import { Fragment } from 'react';
import Counter from './components/Counter';
import Headers from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import { useSelector } from 'react-redux';


function App() {

  const isAuthenticated = useSelector(state => state.authObj.isAuthenticated);

  return (
    <Fragment>
      <Headers />
      {isAuthenticated ? <UserProfile /> : <Auth />}
      <Counter />
    </Fragment>
  );
}

export default App;
