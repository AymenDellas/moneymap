import React from "react";
import LandingPage from "./pages/LandingPage";
import NavLayout from "./Layout/NavLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import Overview from "./components/Overview";
import Transactions from "./components/Transactions";
import SavingsGoals from "./components/SavingsGoals";
import Reports from "./components/Reports";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<NavLayout />}>
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="savings-goals" element={<SavingsGoals />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
