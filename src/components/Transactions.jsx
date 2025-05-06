import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { p } from "motion/react-client";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setTransactions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [transactions]);
  return (
    <>
      <section className="text-light ">
        <div className="w-[95%] lg:w-[70%]  border-light/20 rounded-lg mx-auto space-y-4 p-4">
          <h1 className="text-2xl font-bold">Recent Transactions</h1>

          <div className="w-full bg-gray-800 rounded-xl overflow-y-hidden border border-light/20">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <p>Loading transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="flex justify-center p-8">
                <p>No transactions found</p>
              </div>
            ) : (
              <table class="w-full overflow-x-scroll">
                <thead className="bg-gray-600 ">
                  <tr className="text-left">
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Description</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-light/20 text-sm"
                    >
                      <td className="px-6 py-4">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{transaction.description}</td>
                      <td className="px-6 py-4  ">
                        <p className="bg-gray-600 rounded-full w-fit px-2 ">
                          {transaction.category}
                        </p>
                      </td>
                      <td className={`px-6 py-4 `}>
                        {" "}
                        <p
                          className={`${
                            transaction.type === "income"
                              ? "text-green-500 "
                              : "text-red-500"
                          } rounded-full px-2 py-0.5 w-fit`}
                        >
                          ${transaction.amount}
                        </p>
                      </td>
                      <td>
                        <p
                          className={`${
                            transaction.type === "income"
                              ? "bg-green-500/50 shadow-lg shadow-green-600/30 text-green-100"
                              : "bg-red-500/50 shadow-lg shadow-red-600/30 text-red-100"
                          } rounded-full px-2 py-0.5 w-fit`}
                        >
                          {transaction.type}{" "}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Transactions;
