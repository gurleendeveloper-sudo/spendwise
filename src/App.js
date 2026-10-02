import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import TransactionItem from "./components/TransactionItem";
import TransactionForm from "./components/TranscationForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  return(
    <div>
      <Header/>
      <div className="dashboard-layout">

      <Sidebar/>
      <main className="main-content">
        <h2>Dashboard</h2>
        <p>Welcome to spendwise!</p>
        <SummaryCards/>
        <TransactionItem/>
        <TransactionForm/>
        <TransactionList/>
      </main>
      
      </div>
      </div>
      
      
  )
}


export default App;
