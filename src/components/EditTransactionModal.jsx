import { useState } from "react";
import api from "../api/api";

export default function EditTransactionModal({ tx, close }) {

  const [data, setData] = useState({
    amount: tx.amount,
    category: tx.category,
    division: tx.division,
    description: tx.description
  });

  const update = async () => {
    try {
      await api.put(`/transactions/${tx.id}`, data);
      close();
      window.location.reload();
    } catch (err) {
      alert(
        err.response?.data?.details ||
        "Edit not allowed after 12 hours"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-xl shadow-lg">

        <h2 className="text-lg font-bold mb-4">Edit Transaction</h2>

        <input
          type="number"
          className="w-full mb-3 p-2 border rounded"
          value={data.amount}
          onChange={e =>
            setData({ ...data, amount: Number(e.target.value) })
          }
        />

        <input
          className="w-full mb-3 p-2 border rounded"
          value={data.category}
          onChange={e =>
            setData({ ...data, category: e.target.value })
          }
        />

        <select
          className="w-full mb-3 p-2 border rounded"
          value={data.division}
          onChange={e =>
            setData({ ...data, division: e.target.value })
          }
        >
          <option value="PERSONAL">Personal</option>
          <option value="OFFICE">Office</option>
        </select>

        <textarea
          className="w-full mb-4 p-2 border rounded"
          value={data.description}
          onChange={e =>
            setData({ ...data, description: e.target.value })
          }
        />

        <div className="flex gap-3">
          <button
            onClick={update}
            className="flex-1 bg-indigo-600 text-white py-2 rounded"
          >
            Update
          </button>

          <button
            onClick={close}
            className="flex-1 bg-gray-300 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
