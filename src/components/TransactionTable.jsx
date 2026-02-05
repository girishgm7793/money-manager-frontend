import { useEffect, useState } from "react";
import api from "../api/api";

export default function TransactionTable() {

  // ORIGINAL DATA FROM SERVER
  const [allTransactions, setAllTransactions] = useState([]);

  // FILTERED DATA (UI DISPLAY)
  const [transactions, setTransactions] = useState([]);

  const [division, setDivision] = useState("ALL");
  const [category, setCategory] = useState("ALL");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // LOAD ALL ON START
  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = () => {
    api.get("/transactions")
      .then(res => {
        setAllTransactions(res.data);
        setTransactions(res.data);
      });
  };

  // DATE FILTER (BACKEND)
  const applyDateFilter = () => {
    if (!fromDate || !toDate) return;

    api.get(`/transactions/filter?from=${fromDate}T00:00:00&to=${toDate}T23:59:59`)
      .then(res => {
        setTransactions(res.data);
      });
  };

  // RESET ALL FILTERS
  const resetAll = () => {
    setDivision("ALL");
    setCategory("ALL");
    setFromDate("");
    setToDate("");
    setTransactions(allTransactions);
  };

  // FRONTEND FILTERS
  const filtered = transactions.filter(t =>
    (division === "ALL" || t.division === division) &&
    (category === "ALL" || t.category?.toLowerCase() === category.toLowerCase())
  );

  // CATEGORY DROPDOWN LIST
  const categories = [...new Set(allTransactions.map(t => t.category))];

  return (
    <div className="mt-8 bg-white p-5 rounded-xl shadow">

      <h2 className="text-lg font-bold mb-4">Transaction History</h2>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-4">

        {/* DATE FILTER */}
        <input
          type="date"
          className="border p-2 rounded"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
        />

        <button
          onClick={applyDateFilter}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Apply
        </button>

        <button
          onClick={resetAll}
          className="bg-gray-300 px-4 rounded"
        >
          Reset
        </button>

        {/* DIVISION FILTER */}
        <select
          className="border p-2 rounded"
          value={division}
          onChange={e => setDivision(e.target.value)}
        >
          <option value="ALL">All Divisions</option>
          <option value="PERSONAL">Personal</option>
          <option value="OFFICE">Office</option>
        </select>

        {/* CATEGORY FILTER */}
        <select
          className="border p-2 rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

      </div>

      {/* TABLE */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Type</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Division</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(t => (
            <tr key={t.id} className="text-center">
              <td className="border p-2">{t.type}</td>
              <td className="border p-2 font-semibold">₹{t.amount}</td>
              <td className="border p-2">{t.category}</td>
              <td className="border p-2">{t.division}</td>
              <td className="border p-2">
                {new Date(t.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No transactions found
        </p>
      )}

    </div>
  );
}
