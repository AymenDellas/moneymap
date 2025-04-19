import { create } from "zustand";

const useStore = create((set) => ({
  selectedType: "in",
  selectedCat: "salary",
  description: "",
  income: 0,
  expense: 0,
  amount: 0,
  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedCat: (cat) => set({ selectedCat: cat }),
  setDescription: (desc) => set({ description: desc }),
  setIncome: (income) => set({ income }),
  setExpense: (expense) => set({ expense }),
  setAmount: (amount) => set({ amount }),
}));
export default useStore;
