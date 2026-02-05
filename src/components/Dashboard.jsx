

import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {

  const [summary, setSummary] = useState({});
  const [mode, setMode] = useState("MONTHLY");

  useEffect(() => {
    api.get("/transactions/dashboard")
      .then(res => setSummary(res.data));
  }, []);

  const getIncome = () => {
    if (mode === "WEEKLY") return summary.weeklyIncome || 0;
    if (mode === "YEARLY") return summary.yearlyIncome || 0;
    return summary.monthlyIncome || 0;
  };

  const getExpense = () => {
    if (mode === "WEEKLY") return summary.weeklyExpense || 0;
    if (mode === "YEARLY") return summary.yearlyExpense || 0;
    return summary.monthlyExpense || 0;
  };

  return (
    <div className="mb-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* MONTHLY */}
        <div
          onClick={() => setMode("MONTHLY")}
          className={`cursor-pointer p-5 rounded-xl text-white
            ${mode === "MONTHLY" ? "bg-green-600" : "bg-green-400"}`}
        >
          <h3 className="text-lg font-bold">Monthly</h3>
          <p>Income & Expense</p>
        </div>

        {/* WEEKLY */}
        <div
          onClick={() => setMode("WEEKLY")}
          className={`cursor-pointer p-5 rounded-xl text-white
            ${mode === "WEEKLY" ? "bg-blue-600" : "bg-blue-400"}`}
        >
          <h3 className="text-lg font-bold">Weekly</h3>
          <p>Income & Expense</p>
        </div>

        {/* YEARLY */}
        <div
          onClick={() => setMode("YEARLY")}
          className={`cursor-pointer p-5 rounded-xl text-white
            ${mode === "YEARLY" ? "bg-indigo-600" : "bg-indigo-400"}`}
        >
          <h3 className="text-lg font-bold">Yearly</h3>
          <p>Income & Expense</p>
        </div>

      </div>

      {/* RESULT */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="font-bold text-green-700">{mode} Income</h4>
          <p className="text-2xl font-bold">₹{getIncome()}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-lg">
          <h4 className="font-bold text-red-700">{mode} Expense</h4>
          <p className="text-2xl font-bold">₹{getExpense()}</p>
        </div>
      </div>

    </div>
  );
}

