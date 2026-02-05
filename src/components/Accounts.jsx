import { useEffect, useState } from "react";
import api from "../api/api";

export default function Accounts() {

  const [accounts, setAccounts] = useState([]);
  const [data, setData] = useState({
    name: "",
    balance: "",
    type: "PERSONAL"
  });

  // load accounts
  const loadAccounts = () => {
    api.get("/accounts")
      .then(res => setAccounts(res.data));
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  // create account
  const createAccount = async () => {
    if(!data.name || !data.balance) {
      alert("Enter account details");
      return;
    }

    await api.post("/accounts", data);

    setData({ name:"", balance:"", type:"PERSONAL" });
    loadAccounts();
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6">

      <h2 className="text-lg font-bold mb-4">Accounts</h2>

      {/* ADD ACCOUNT */}
      <div className="flex gap-3 mb-6">

        <input
          placeholder="Account Name"
          className="border p-2 rounded"
          value={data.name}
          onChange={e=>setData({...data,name:e.target.value})}
        />

        <input
          placeholder="Opening Balance"
          type="number"
          className="border p-2 rounded"
          value={data.balance}
          onChange={e=>setData({...data,balance:e.target.value})}
        />

        <select
          className="border p-2 rounded"
          value={data.type}
          onChange={e=>setData({...data,type:e.target.value})}
        >
          <option value="PERSONAL">Personal</option>
          <option value="OFFICE">Office</option>
        </select>

        <button
          onClick={createAccount}
          className="bg-green-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* ACCOUNT LIST */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Balance</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map(acc => (
            <tr key={acc.id} className="text-center">
              <td className="border p-2">{acc.name}</td>
              <td className="border p-2">{acc.type}</td>
              <td className="border p-2 font-bold">₹{acc.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
