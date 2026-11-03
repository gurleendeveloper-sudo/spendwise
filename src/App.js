
import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

import "./App.css";

// Sample transactions
const initialTransactions = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Salary",
    date: "2026-10-01",
    amount: 50000,
    type: "income",
    description: "Monthly salary",
  },
  {
    id: 2,
    title: "Groceries",
    category: "Food",
    date: "2026-10-02",
    amount: 2500,
    type: "expense",
    description: "Monthly groceries",
  },
  {
    id: 3,
    title: "Electricity Bill",
    category: "Bills",
    date: "2026-10-03",
    amount: 1800,
    type: "expense",
    description: "Electricity bill payment",
  },
];

const STORAGE_KEY = "spendwiseTransactions";

// Load saved transactions
function loadTransactions() {
  try {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);

    if (savedTransactions !== null) {
      const parsedTransactions = JSON.parse(savedTransactions);

      if (Array.isArray(parsedTransactions)) {
        return parsedTransactions;
      }
    }
  } catch (error) {
    console.error("Error loading transactions:", error);
  }

  return initialTransactions;
}

function App() {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Save transactions whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.error("Error saving transactions:", error);
    }
  }, [transactions]);

  // Add transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      amount: Number(transaction.amount),
    };

    setTransactions((previousTransactions) => [
      newTransaction,
      ...previousTransactions,
    ]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );

    setEditingTransaction((current) =>
      current?.id === id ? null : current
    );
  };

  // Select transaction for editing
  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Update transaction
  const updateTransaction = (updatedTransaction) => {
    setTransactions((previousTransactions) =>
      previousTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? {
              ...updatedTransaction,
              amount: Number(updatedTransaction.amount),
            }
          : transaction
      )
    );

    setEditingTransaction(null);
  };

  // Calculate income
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  // Calculate expenses
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount || 0),
      0
    );

  // Calculate balance and savings
  const balance = totalIncome - totalExpenses;
  const savings = balance;

  return (
    <div className="app">

      <main className="main-content">
        <Header />

        {/* Summary Cards */}
        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          savings={savings}
        />

      
{/* Add Transaction Form - Show only when not editing */}
{!editingTransaction && (
  <TransactionForm
    onAddTransaction={addTransaction}
  />
)}

{/* Transaction List and Edit Modal */}
<TransactionList
  transactions={transactions}
  onEdit={editTransaction}
  onDelete={deleteTransaction}
  editingTransaction={editingTransaction}
  onUpdateTransaction={updateTransaction}
  onCancelEdit={() => setEditingTransaction(null)}
/>

      </main>
    </div>
  );
}

export default App;
