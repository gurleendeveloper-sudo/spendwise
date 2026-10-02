
function TransactionList() {
  return (
    <div className="transaction-list">

      {/* Header */}
      <div className="transaction-list-header">
        <h2>All Transactions</h2>
        <button className="view-all-btn">View All</button>
      </div>

      {/* Search Bar */}
      <div className="transaction-search">
        <input
          type="text"
          placeholder="Search transactions..."
        />
      </div>

      {/* Filter Buttons */}
      <div className="transaction-filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Income</button>
        <button className="filter-btn">Expense</button>
      </div>

      {/* Transaction Table */}
      <div className="transaction-table-container">
        <table className="transaction-table">

          <thead>
            <tr>
              <th>Transaction</th>
              <th>Category</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Monthly Salary</td>
              <td>Salary</td>
              <td>25 Sep 2026</td>
              <td>
                <span className="income-badge">Income</span>
              </td>
              <td className="income-amount">+ ₹40,000</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>

            <tr>
              <td>Grocery Shopping</td>
              <td>Food</td>
              <td>24 Sep 2026</td>
              <td>
                <span className="expense-badge">Expense</span>
              </td>
              <td className="expense-amount">- ₹2,000</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>

            <tr>
              <td>House Rent</td>
              <td>Housing</td>
              <td>20 Sep 2026</td>
              <td>
                <span className="expense-badge">Expense</span>
              </td>
              <td className="expense-amount">- ₹12,000</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>

            <tr>
              <td>Electricity Bill</td>
              <td>Bills</td>
              <td>18 Sep 2026</td>
              <td>
                <span className="expense-badge">Expense</span>
              </td>
              <td className="expense-amount">- ₹1,200</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>

            <tr>
              <td>Freelance Project</td>
              <td>Freelance</td>
              <td>15 Sep 2026</td>
              <td>
                <span className="income-badge">Income</span>
              </td>
              <td className="income-amount">+ ₹8,000</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default TransactionList;