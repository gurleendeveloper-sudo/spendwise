function TransactionItem(){
    return(
        <div className="transaction-item">
            <div className="transaction-details">
                <h3>Grocery Shopping</h3>
                <p>Category: Food</p>
                <p>Date: 28-sep-2026</p>
                <p>Type: Expense</p>
            </div>
            <div className="transaction-right">
                <h3 className="expense-amount">- 15,000</h3>
            </div>
            <div className="transaction-actions">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
            </div>
        </div>

    )
}
export default TransactionItem;