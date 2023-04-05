import ExpenseForm from "./ExpenseForm";

import "./NewExpense.css"

function NewExpense(props) {

    const saveExpenseDataHandler = receivedExpenseData => {
        props.onAddingNewExpense(receivedExpenseData);
    }

    return (
        <div className="new-expense">
            <ExpenseForm 
                onSaveExpenseData={saveExpenseDataHandler}
            />
        </div>
    )
}

export default NewExpense;