
import React, { useEffect, useState } from "react";

function TransactionForm({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  const [type, setType] = useState("income");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");

  // Reset form
  const resetForm = () => {
    setType("income");
    setTitle("");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setError("");
  };

  // Load transaction details when editing
  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type || "expense");
      setTitle(editingTransaction.title || "");
      setAmount(String(editingTransaction.amount ?? ""));
      setCategory(editingTransaction.category || "");
      setDescription(editingTransaction.description || "");
      setDate(
        editingTransaction.date ||
        new Date().toISOString().split("T")[0]
      );
      setError("");
    } else {
      resetForm();
    }
  }, [editingTransaction]);

  // Submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !title.trim() ||
      !amount ||
      !category ||
      !date
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter an amount greater than zero.");
      return;
    }

    const transactionData = {
      title: title.trim(),
      amount: numericAmount,
      category,
      description: description.trim(),
      date,
      type,
    };

    if (editingTransaction) {
      onUpdateTransaction({
        ...transactionData,
        id: editingTransaction.id,
      });
    } else {
      onAddTransaction(transactionData);
    }

    resetForm();
  };

  // Cancel editing
  const handleCancel = () => {
    resetForm();

    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="transaction-Form">

      <h2>
        {editingTransaction
          ? "Edit Transaction"
          : "Add New Transaction"}
      </h2>

      <form onSubmit={handleSubmit}>

        {/* Transaction Type */}
        <div className="form-group">
          <label>Transaction Type</label>

          <div className="type-buttons">

            <button
              type="button"
              className={`income-btn ${
                type === "income" ? "active" : ""
              }`}
              onClick={() => {
                setType("income");
                setError("");
              }}
              aria-pressed={type === "income"}
            >
              <span>＋</span> Income
            </button>

            <button
              type="button"
              className={`expense-btn ${
                type === "expense" ? "active" : ""
              }`}
              onClick={() => {
                setType("expense");
                setError("");
              }}
              aria-pressed={type === "expense"}
            >
              <span>－</span> Expense
            </button>

          </div>
        </div>

        {/* Transaction Title */}
        <div className="form-group">
          <label htmlFor="transaction-title">
            Transaction Title*
          </label>

          <input
            id="transaction-title"
            type="text"
            placeholder="E.g. grocery shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="transaction-amount">
            Amount*
          </label>

          <input
            id="transaction-amount"
            type="number"
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="transaction-category">
            Category*
          </label>

          <select
            id="transaction-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select category
            </option>

            <option value="Salary">Salary</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Housing">Housing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label htmlFor="transaction-date">
            Date*
          </label>

          <input
            id="transaction-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="transaction-description">
            Description (optional)
          </label>

          <textarea
            id="transaction-description"
            placeholder="Add a note"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        {/* Form Buttons */}
        <div className="form-actions">

          <button
            type="submit"
            className="submit-btn"
          >
            {editingTransaction
              ? "Save Changes"
              : "Add Transaction"}
          </button>

          {editingTransaction && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>
  );
}

export default TransactionForm;
