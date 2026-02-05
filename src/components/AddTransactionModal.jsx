
import { useEffect, useState } from "react";
import api from "../api/api";

export default function AddTransactionModal({ close }) {

  const [activeTab, setActiveTab] = useState("EXPENSE");
  const [accounts, setAccounts] = useState([]);

  const [data, setData] = useState({
    amount: "",
    category: "",
    division: "PERSONAL",
    fromAccount: "",
    toAccount: "",
    description: ""
  });

  useEffect(() => {
    api.get("/accounts").then(res => setAccounts(res.data));
  }, []);

  const save = async () => {
    try {
      await api.post("/transactions", {
        type: activeTab,
        amount: Number(data.amount),
        category: data.category,
        division: data.division,
        fromAccount: data.fromAccount,
        toAccount: data.toAccount,
        description: data.description
      });

      close();
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.details || "Error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[420px] p-6 rounded-xl shadow-xl">

        <h2 className="text-xl font-bold mb-4 text-center">
          Add Transaction
        </h2>

        {/* TABS */}
        <div className="flex mb-4 border rounded overflow-hidden">
          {["INCOME", "EXPENSE", "TRANSFER"].map(t => (
            <button
              key={t}
              className={`flex-1 py-2 font-semibold ${
                activeTab === t
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Amount"
          className="w-full mb-3 p-2 border rounded"
          onChange={e =>
            setData({ ...data, amount: e.target.value })
          }
        />

        {activeTab !== "TRANSFER" && (
          <input
            placeholder="Category"
            className="w-full mb-3 p-2 border rounded"
            onChange={e =>
              setData({ ...data, category: e.target.value })
            }
          />
        )}

        <select
          className="w-full mb-3 p-2 border rounded"
          onChange={e =>
            setData({ ...data, division: e.target.value })
          }
        >
          <option value="PERSONAL">Personal</option>
          <option value="OFFICE">Office</option>
        </select>

        {/* FROM ACCOUNT */}
        <select
          className="w-full mb-3 p-2 border rounded"
          onChange={e =>
            setData({ ...data, fromAccount: e.target.value })
          }
        >
          <option value="">From Account</option>
          {accounts.map(a => (
            <option key={a.id} value={a.name}>
              {a.name} (₹{a.balance})
            </option>
          ))}
        </select>

        {/* TO ACCOUNT (ONLY TRANSFER) */}
        {activeTab === "TRANSFER" && (
          <select
            className="w-full mb-3 p-2 border rounded"
            onChange={e =>
              setData({ ...data, toAccount: e.target.value })
            }
          >
            <option value="">To Account</option>
            {accounts.map(a => (
              <option key={a.id} value={a.name}>{a.name}</option>
            ))}
          </select>
        )}

        <textarea
          placeholder="Description"
          className="w-full mb-4 p-2 border rounded"
          onChange={e =>
            setData({ ...data, description: e.target.value })
          }
        />

        <div className="flex gap-3">
          <button
            onClick={save}
            className="flex-1 bg-indigo-600 text-white py-2 rounded"
          >
            Save
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

