import { useRef, useState } from 'react';

import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';

function MealItemForm(props) {

    const [amountIsValid, setAmountIsValid] = useState(true);

    const amountRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const itemAmount = amountRef.current.value;
        const itemAmountNumber = +amountRef.current.value;

        
        if(itemAmount.trim().length  < 1) {
            setAmountIsValid(false);
            return
        }
        props.onAddToCart(itemAmountNumber);
    }

    return <form className={styles.form} onSubmit={submitHandler}>
        <Input label='amount' 
            ref= {amountRef}
            input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
    </form>
}

export default MealItemForm;