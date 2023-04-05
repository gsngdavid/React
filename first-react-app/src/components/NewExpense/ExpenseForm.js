import { useState } from "react";
import "./ExpenseForm.css";

function ExpenseForm(props) {

    const [inputTitle, setInputTitle] = useState("");
    const [inputAmount, setInputAmount] = useState("");
    const [inputDate, setInputDate] = useState("");

    const titleChangeHandler = (event) => {
        setInputTitle(event.target.value);
    }

    const amountChangeHandler = (event) => {
        setInputAmount(event.target.value);
    }

    const dateChangeHandler = (event) => {
        setInputDate(event.target.value);
    }

    const submitHandler = event => {
        event.preventDefault();
        const expenseData = {
            title: inputTitle,
            amount: inputAmount,
            date: new Date(inputDate)
        }
        setInputTitle('');
        setInputAmount('');
        setInputDate('');
        props.onSaveExpenseData(expenseData);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input 
                        onChange={titleChangeHandler}
                        value={inputTitle}
                        type="text" 
                    />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input 
                    onChange={amountChangeHandler}
                     type="number"
                     min="0.01"
                     step="0.01"
                     value={inputAmount}
                    />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input 
                    onChange={dateChangeHandler}
                     type="date"
                     min="2019-01-01"
                     max="2022-12-31"
                     value={inputDate}
                    />
                </div>
                <div className="new-expense__actions">
                    <button type="submit">Add Expense</button>
                </div>
            </div>
        </form>
    )
}

export default ExpenseForm;