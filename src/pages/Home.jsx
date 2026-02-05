import { useState } from "react";
import Dashboard from "../components/Dashboard";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";
import CategorySummary from "../components/CategorySummary";
import Accounts from "../components/Accounts";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      
      {/* HEADER */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">
          💰 Money Manager
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Transaction
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-6">
        <Dashboard />
        <TransactionTable />
        <CategorySummary />
        <Accounts />
      </div>

      {open && <AddTransactionModal close={() => setOpen(false)} />}
    </div>
    );
    
}
