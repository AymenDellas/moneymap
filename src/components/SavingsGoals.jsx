import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Target,
  Trash,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

const SavingsGoals = () => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [goals, setGoals] = useState([]);
  const [amounts, setAmounts] = useState({});

  const fetchGoals = async () => {
    try {
      const { data, error } = await supabase.from("savings").select("*");
      if (error) console.error("Error", error);
      setGoals(data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goalName || !targetAmount || !date) {
      setError("Please fill out all the fields");
      return;
    }

    try {
      const { data, error } = await supabase.from("savings").insert([
        {
          goalName: goalName,
          targetAmount: targetAmount,
          date: date,
          currentSavings: 0,
        },
      ]);
      if (error) {
        setError("Error inserting your goal.");
        return;
      }
      fetchGoals();
      setMessage("Goal added successfully ! ");
      setTimeout(() => {
        setError("");
      }, 2500);
      setTimeout(() => {
        setMessage("");
      }, 2500);
      setDate("");
      setTargetAmount(null);
      setGoalName("");
    } catch (error) {
      throw error;
    }
  };

  const handleAmountChange = (goalId, value) => {
    setAmounts({
      ...amounts,
      [goalId]: value,
    });
  };

  const handleAddAmount = async (e, goalId) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amounts[goalId] || 0);
    if (isNaN(parsedAmount)) return;

    try {
      // Get current goal data
      const { data, error: fetchError } = await supabase
        .from("savings")
        .select("*")
        .eq("id", goalId)
        .single();

      if (fetchError) {
        console.error("Fetch error", fetchError);
        return;
      }

      const updatedAmount = (data.currentSavings || 0) + parsedAmount;

      const { error: updateError } = await supabase
        .from("savings")
        .update({ currentSavings: updatedAmount })
        .eq("id", goalId);

      if (updateError) {
        console.error("Update error", updateError);
        return;
      }

      setAmounts({
        ...amounts,
        [goalId]: "",
      });
      setGoals(
        goals.map((goal) =>
          goal.id === goalId ? { ...goal, currentSavings: updatedAmount } : goal
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = async (goalId) => {
    const { data, error } = await supabase
      .from("savings")
      .delete()
      .eq("id", goalId);

    if (error) {
      console.log(error);
      return;
    }
    setGoals(goals.filter((goal) => goal.id != goalId));
  };
  return (
    <>
      {" "}
      <section className="flex flex-col max-lg:w-[90%] lg:w-[50%] mx-auto bg-slate-800 p-4 rounded-lg border space-y-4 border-light/20">
        <div className="flex items-center space-x-4 bg-blue-600 p-2 rounded-lg">
          <span className="p-2 rounded-lg bg-gradient-to-br from-blue-800 to-blue-400 text-white">
            <Target size={30} />
          </span>

          <h1 className="font-bold text-2xl text-light">
            Add New Savings Goal
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-white"
        >
          <input
            type="text"
            name="goalName"
            id="goalName"
            placeholder="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="p-2 rounded-lg outline-none focus:ring-4 ring-blue-500 transition-all duration-300 ease-out bg-primary/20 border border-light/20"
          />
          <input
            type="number"
            name="tagetAmount"
            id="targetAmount"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="p-2 rounded-lg outline-none focus:ring-4 ring-blue-500 transition-all duration-300 ease-out bg-primary/20 border border-light/20"
          />
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 rounded-lg outline-none focus:ring-4 ring-blue-500 transition-all duration-300 ease-out bg-primary/20 border border-light/20"
          />
          {error && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-200 border border-red-500 p-2 rounded-lg">
              <AlertCircle />
              <p>{error}</p>
            </div>
          )}
          {message && (
            <div className="flex items-center space-x-2 text-green-800 bg-green-100 border border-green-800 p-2 rounded-lg">
              <CheckCircle />
              <p>{message}</p>
            </div>
          )}

          <button className="bg-blue-600 text-light px-4 py-2 w-full rounded-lg hover:bg-blue-600/80 transition-colors duration-300 ease-out">
            Add Goal
          </button>
        </form>
      </section>
      <section className="w-[95%]  xl:w-[90%] 2xl:w-[80%] mx-auto">
        {" "}
        <div className="grid gap-4 lg:gap-12  grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 justify-items-center m-4">
          {" "}
          {goals.map((goal, i) => {
            const isGoalReached = goal.currentSavings >= goal.targetAmount;
            return (
              <article
                key={i}
                className="bg-slate-800 rounded-lg border border-light/20 w-96 text-light m-4 space-y-4"
              >
                <div className="flex items-center justify-between border-b p-3">
                  <h2 className="text-2xl font-bold">{goal.goalName}</h2>
                  <button
                    type="button"
                    onClick={() => handleDelete(goal.id)}
                    className="rounded-lg p-1 text-red-500 hover:bg-light/10 transition-colors duration-200 ease-out"
                  >
                    <Trash />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  {" "}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">Current : </p>
                      <span>${goal.currentSavings || 0}</span>
                    </div>
                    <div>
                      <p className="font-bold">Target : </p>
                      <span>${goal.targetAmount}</span>
                    </div>
                  </div>
                  <div className="w-full rounded-full bg-slate-700 h-2.5 relative overflow-hidden ">
                    <div
                      style={{
                        width: `${
                          (goal.currentSavings / goal.targetAmount) * 100
                        }%`,
                      }}
                      className={`absolute bg-gradient-to-r  h-2.5 rounded-full transition-all duration-500 ease-out ${
                        isGoalReached
                          ? "from-green-900 to-green-500"
                          : "from-blue-700 to-blue-400"
                      }`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Calendar size={18} />{" "}
                      <span className="text-gray-400">Deadline : </span>
                    </div>
                    <span>{goal.date}</span>
                  </div>
                  <div>
                    {isGoalReached ? (
                      <div className="flex justify-center p-4 rounded-lg bg-green-900/20 border border-green-500">
                        <p>🎉 Goal Reached !</p>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => handleAddAmount(e, goal.id)}
                        className="flex items-center justify-between space-x-2 mt-8"
                      >
                        <input
                          type="number"
                          name="amount"
                          id={`amount-${goal.id}`}
                          placeholder="Add Amount"
                          value={amounts[goal.id] || ""}
                          onChange={(e) =>
                            handleAmountChange(goal.id, e.target.value)
                          }
                          className="p-2 rounded-lg outline-none focus:ring-4 ring-blue-500 transition-all duration-300 ease-out bg-primary/20 border border-light/20 w-full"
                        />
                        <button className="bg-blue-600  text-light px-4 py-2 w-1/2 rounded-lg hover:bg-primary/80 transition-colors duration-300 ease-out">
                          Add Amount
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default SavingsGoals;
