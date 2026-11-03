
import React, { useMemo, useState } from "react";
import TransactionForm from "./TransactionForm";

function TransactionList({
  transactions = [],
  onEdit,
  onDelete,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Format amount
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date + "T00:00:00");

    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Search and filter
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        (transaction.title || "").toLowerCase().includes(search) ||
        (transaction.category || "").toLowerCase().includes(search) ||
        (transaction.description || "").toLowerCase().includes(search);

      const matchesType =
        filterType === "all" || transaction.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  // Delete with confirmation
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="transaction-list">

      {/* Header */}
      <div className="transaction-list-header">
        <h2>All Transactions</h2>
        <span>{filteredTransactions.length} transactions</span>
      </div>

      {/* Search */}
      <div className="transaction-search">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="transaction-filters">
        {["all", "income", "expense"].map((type) => (
          <button
            key={type}
            type="button"
            className={`filter-btn ${
              filterType === type ? "active" : ""
            }`}
            onClick={() => setFilterType(type)}
          >
            {type === "all"
              ? "All"
              : type === "income"
              ? "Income"
              : "Expense"}
          </button>
        ))}
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
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>

                  <td>{transaction.category}</td>

                  <td>{formatDate(transaction.date)}</td>

                  <td>
                    <span
                      className={
                        transaction.type === "income"
                          ? "income-badge"
                          : "expense-badge"
                      }
                    >
                      {transaction.type === "income"
                        ? "Income"
                        : "Expense"}
                    </span>
                  </td>

                  <td
                    className={
                      transaction.type === "income"
                        ? "income-amount"
                        : "expense-amount"
                    }
                  >
                    {transaction.type === "income" ? "+ " : "- "}
                    {formatAmount(transaction.amount)}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => onEdit(transaction)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* EDIT MODAL */}
      {editingTransaction && (
        <div
          className="edit-modal-overlay"
          onClick={onCancelEdit}
        >
          <div
            className="edit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="edit-modal-header">
              <h2 id="edit-modal-title">Edit Transaction</h2>

              <button
                type="button"
                className="modal-close-btn"
                onClick={onCancelEdit}
                aria-label="Close edit window"
              >
                ×
              </button>
            </div>

            <div className="edit-modal-body">
              <TransactionForm
                editingTransaction={editingTransaction}
                onUpdateTransaction={onUpdateTransaction}
                onCancelEdit={onCancelEdit}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default TransactionList;
