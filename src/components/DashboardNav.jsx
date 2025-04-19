import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, WalletCards, Target, ClipboardList } from "lucide-react";
const DashboardNav = () => {
  const navItems = [
    { path: "overview", label: "Overview", icon: BarChart3 },
    { path: "transactions", label: "Transactions", icon: WalletCards },
    { path: "savings-goals", label: "Savings Goals", icon: Target },
    { path: "reports", label: "Reports", icon: ClipboardList },
  ];
  return (
    <nav className="mx-4">
      <div className="text-light bg-secondary rounded-lg w-fit my-8 overflow-hidden mx-auto p-1">
        <ul className="grid grid-cols-2  lg:grid-cols-4 lg:space-x-8 text-center  lg:place-items-center ">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                className={({ isActive }) =>
                  `transition-all duration-300 ease-out relative group m-4 hover:text-purple ${
                    isActive ? "text-purple" : "text-light"
                  }`
                }
                to={item.path}
                key={item.path}
              >
                {({ isActive }) => (
                  <>
                    <li className="flex items-center space-x-1">
                      <Icon />
                      <p>{item.label}</p>
                    </li>
                    <span
                      className={`absolute rounded-full h-1 bg-purple -bottom-2 left-0 transition-all duration-300 ease-out ${
                        isActive
                          ? "w-full opacity-100"
                          : "w-0 opacity-50 group-hover:w-1/2"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default DashboardNav;
