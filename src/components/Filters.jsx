import { useState } from "react";

export default function Filters({ onFilter }) {

  const [division, setDivision] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const applyFilter = () => {
    onFilter({
      division,
      category,
      fromDate,
      toDate
    });
  };

  const resetFilter = () => {
    setDivision("ALL");
    setCategory("ALL");
    setFromDate("");
    setToDate("");

    onFilter({
      division:"ALL",
      category:"ALL",
      fromDate:"",
      toDate:""
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-wrap gap-3 items-center">

      {/* DATE */}
      <input
        type="date"
        className="border p-2 rounded"
        value={fromDate}
        onChange={e=>setFromDate(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 rounded"
        value={toDate}
        onChange={e=>setToDate(e.target.value)}
      />

      {/* DIVISION */}
      <select
        className="border p-2 rounded"
        value={division}
        onChange={e=>setDivision(e.target.value)}
      >
        <option value="ALL">All Divisions</option>
        <option value="PERSONAL">Personal</option>
        <option value="OFFICE">Office</option>
      </select>

      {/* CATEGORY */}
      <input
        placeholder="Category (food, fuel...)"
        className="border p-2 rounded"
        value={category === "ALL" ? "" : category}
        onChange={e=>setCategory(e.target.value || "ALL")}
      />

      {/* BUTTONS */}
      <button
        onClick={applyFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>

      <button
        onClick={resetFilter}
        className="bg-gray-300 px-4 py-2 rounded"
      >
        Reset
      </button>

    </div>
  );
}
