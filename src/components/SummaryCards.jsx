function SummaryCards(){
    return(
        <div className="summary-cards">
            <div className="summary-card balance-card">
                <h3>Total Balance</h3>
                <h2>$25,000</h2>
                <p>Available amount</p>

            </div> 

            <div className="summary-card income-card">
                <h3>Total Income</h3>
                <h2>$40,000</h2>
                <p>Money Received</p>
                
            </div> 

            
            <div className="summary-card expense-card">
                <h3>Total Expenses</h3>
                <h2>$15,000</h2>
                <p>Money spent</p>
                
            </div>

               <div className="summary-card savings-card">
                <h3>Savings</h3>
                <h2>$25,000</h2>
                <p>Remaining amount</p>
                
            </div>

        </div>

    )
}

export default SummaryCards;