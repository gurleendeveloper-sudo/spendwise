
import React from "react";

function SummaryCards({
  totalIncome = 0,
  totalExpenses = 0,
  balance = 0,
  savings = 0,
}) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  return (
    <div className="summary-cards">

      <div className="summary-card balance-card">
        <h3>Total Balance</h3>
        <h2>{formatAmount(balance)}</h2>
        <p>Available amount</p>
      </div>

      <div className="summary-card income-card">
        <h3>Total Income</h3>
        <h2>{formatAmount(totalIncome)}</h2>
        <p>Money received</p>
      </div>

      <div className="summary-card expense-card">
        <h3>Total Expenses</h3>
        <h2>{formatAmount(totalExpenses)}</h2>
        <p>Money spent</p>
      </div>

      <div className="summary-card savings-card">
        <h3>Savings</h3>
        <h2>{formatAmount(savings)}</h2>
        <p>Remaining amount</p>
      </div>

    </div>
  );
}

export default SummaryCards;
