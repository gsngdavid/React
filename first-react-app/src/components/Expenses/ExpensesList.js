import ExpenseItem from "./ExpenseItem";

import "./ExpensesList.css";

function ExpensesList(props) {
    if(props.items.length === 0) {
        return <h2 className="expenses-list__fallback">Found no expenses!</h2>
    }
    
    return <ul>
        {props.items.map(expense => {
            return(
                <ExpenseItem
                    key={expense.id}
                    expenseDate={expense.date}
                    expenseTitle={expense.title}
                    expenseAmount={expense.amount}
                />
            )
        })}
    </ul>;
}

export default ExpensesList;