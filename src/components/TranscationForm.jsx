function TransactionForm(){
    return(
        <div className="transaction-Form">
            <h2>Add New Transaction</h2>
            <form>
                <div className="form-group">
                    <label>Transaction Type</label>
                    <div className="type-buttons">
                        <button type="button" className="income-btn">Income</button>
                        <button type="button" className="expense-btn">Expense</button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Transaction Title</label>
                    <input type="text" placeholder="e.g Grocery shopping"/>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input type="number" placeholder="Enter amount"/>
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select defaultValue="">
                        <option value ="" disabled>
                            select category
                        </option>
                                    <option>Salary</option>
            <option>Food</option>
            <option>Shopping</option>
            <option>Transport</option>
            <option>Bills</option>
            <option>Housing</option>
            <option>Healthcare</option>
            <option>Entertainment</option>
            <option>Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Description(optional)</label>
                    <textarea placeholder="Add a note" rows="3">
                        
                    </textarea>
                </div>
                <button type="button" className="submit-btn">
                    Add transaction
                </button>
            

        </form>

        </div>

    )
}
export default TransactionForm;