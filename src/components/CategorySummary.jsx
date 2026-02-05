import { useEffect, useState } from "react";
import api from "../api/api";

export default function CategorySummary() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("/transactions/summary/category")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold text-gray-700 mb-3">
        Category Summary
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {Object.keys(data).map(k => (
          <div key={k} className="bg-slate-100 p-3 rounded">
            <p className="text-sm text-gray-500">{k}</p>
            <p className="font-semibold">₹{data[k]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

