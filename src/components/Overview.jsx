import React, { useEffect, useState } from "react";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Loader,
} from "lucide-react";
import { supabase } from "../../supabase";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";
const Overview = () => {
  const [selectedType, setSelectedType] = useState("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedCat, setSelectedCat] = useState("salary");
  const [error, setError] = useState("");
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(0);
  useEffect(() => {
    fetchTransactions();
  }, []);
  const fetchTransactions = async () => {
    try {
      const { data: incomeData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "income");
      const { data: expenseData } = await supabase
        .from("transactions")
        .select("amount")
        .eq("type", "expense");
      const { data: savingsData } = await supabase.from("savings").select("*");

      const totalGoals =
        savingsData?.reduce(
          (sum, item) => sum + parseFloat(item.targetAmount),
          0
        ) || 0;
      const totalSavings =
        savingsData?.reduce(
          (sum, item) => sum + parseFloat(item.currentSavings),
          0
        ) || 0;
      const totalIncome =
        incomeData?.reduce((sum, item) => sum + parseFloat(item.amount), 0) ||
        0;
      const totalExpense =
        expenseData?.reduce((sum, item) => sum + parseFloat(item.amount), 0) ||
        0;
      if (error) {
        console.log("Error fetching transactions: ", error);
        return;
      }
      setIncome(totalIncome);
      setExpense(totalExpense);
      setSavingsGoals(totalGoals);
      setCurrentSavings(totalSavings);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount) {
      setError("Please fill out all the fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      const { data, error: insertError } = await supabase
        .from("transactions")
        .insert([
          {
            description,
            amount,
            type: selectedType,
            category: selectedCat,
            user_id: user.id,
          },
        ]);
      if (!insertError) {
        fetchTransactions();
        setDescription("");
        setAmount(0);
        setError("");
      }

      if (insertError) throw error;
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error inserting transaction: ", error);
      setError("Error inserting transaction");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: transactions, error } = await supabase
          .from("transactions")
          .select("*")
          .order("created_at", { ascending: true });
        if (error) throw error;
        setTransactions(transactions);

        const formatted = {};
        transactions.forEach((tx) => {
          const date = tx.created_at.split("T")[0];
          if (!formatted[date]) {
            formatted[date] = { date, income: 0, expense: 0 };
          }
          if (tx.type === "income") {
            formatted[date].income += tx.amount;
          } else if (tx.type === "expense") {
            formatted[date].expense += tx.amount;
          }
        });
        const formattedChartData = Object.values(formatted);
        setChartData(formattedChartData);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className=" 2xl:px-64">
      <div className="grid m-4 grid-cols-1 lg:grid-cols-2  xl:grid-cols-4 gap-4 text-light">
        <div className="max-lg:col-span-2 md:col-span-1 rounded-lg border border-light/20 p-4 space-y-4 bg-secondary/40">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Total Balance</h1>
            <span className="p-3 bg-blue-500/20 rounded-full">
              <DollarSign size={20} className="text-blue-400" />
            </span>
          </div>
          <p className="font-bold text-3xl text-blue-500">
            ${income - expense}
          </p>
        </div>
        <div className="max-lg:col-span-2 md:col-span-1 rounded-lg border border-light/20 p-4 space-y-4 bg-secondary/40">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Income</h1>
            <span className="rounded-full p-3 bg-green-500/20">
              <ArrowUpRight size={20} className="text-green-600" />
            </span>
          </div>
          <p className="font-bold text-3xl text-green-500">${income}</p>
        </div>
        <div className="max-lg:col-span-2 md:col-span-1 rounded-lg border border-light/20 p-4 space-y-4 bg-secondary/40">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Expense</h1>
            <span className="rounded-full p-3 bg-red-500/20">
              <ArrowDownRight size={20} className="text-red-600" />
            </span>
          </div>
          <p className="font-bold text-3xl text-red-400">${expense}</p>
        </div>
        <div className="max-lg:col-span-2 md:col-span-1 rounded-lg border border-light/20 p-4 space-y-4 bg-secondary/40">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Savings Goals</h1>
            <span className="rounded-full p-3 bg-purple/20">
              <TrendingUp size={20} className="text-purple" />
            </span>
          </div>
          <p className="font-bold text-3xl text-purple  ">
            ${savingsGoals - currentSavings}
          </p>
        </div>
        <div className="col-span-2 rounded-lg border border-light/20 p-4 space-y-4 bg-secondary/40">
          <h1 className="font-bold text-2xl">Add Transaction</h1>
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="text-primary space-y-4 "
          >
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => setSelectedType("income")}
                className={`p-4 text-center text-light  rounded-lg border  w-full ${
                  selectedType === "income"
                    ? "bg-green-600/20  border-green-500"
                    : "bg-secondary/80 border-light/20"
                }`}
              >
                Income
              </button>{" "}
              <button
                type="button"
                onClick={() => setSelectedType("expense")}
                className={`p-4 text-center  text-light  rounded-lg border  ml-4 w-full ${
                  selectedType === "expense"
                    ? "bg-red-600/20 border-red-500"
                    : "bg-secondary/80 border-light/20"
                }`}
              >
                Expense
              </button>
            </div>
            <div className="flex flex-col space-y-4 flex-shrink-0">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter a description"
                className="p-2 rounded-lg outline-none bg-secondary/80 border border-light/20 text-light"
              />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Enter an amount"
                className="p-2 rounded-lg outline-none bg-secondary/80 border border-light/20 text-light"
              />
            </div>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              name="category"
              id=""
              className=" p-2 outline-none rounded-lg text-light  w-full font-bold bg-secondary/80 border border-light/20"
            >
              {selectedType === "income" ? (
                <>
                  {" "}
                  <option value="salary">Salary</option>
                  <option value="freelance">Freelance</option>
                  <option value="invest">Investements</option>
                </>
              ) : selectedType === "expense" ? (
                <>
                  <option value="housing">Housing</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="education">Education</option>
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                </>
              ) : (
                ""
              )}
            </select>
            {error && (
              <div className=" text-red-500 ">
                <p>{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
                selectedType === "income"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader size={18} className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                `Add ${selectedType === "income" ? "Income" : "Expense"}`
              )}
            </button>
          </form>
        </div>
        <div className="col-span-2 rounded-lg border border-light/20 p-4 space-y-4 bg-secondary/40">
          <LineChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22c55e" />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" />
          </LineChart>
        </div>
      </div>
    </section>
  );
};

export default Overview;
