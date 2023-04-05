import {Fragment} from 'react';

import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

function Header (props) {
    return <Fragment>
        <header className={styles.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={styles['main-image']}>
            <img src={mealsImage} alt='A table of delicious meals food!' />
        </div>
    </Fragment>
}

export default Header;