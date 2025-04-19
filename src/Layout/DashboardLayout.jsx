import React, { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const DashbardLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/login");
      } else {
        setIsLoading(false);
      }
    };
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        navigate("/login");
      } else {
        setIsLoading(false);
      }
    });
    checkIfLoggedIn();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <p className="font-bold text-3xl animate-pulse text-white">
            Loading...
          </p>
        </div>
      ) : (
        <>
          {" "}
          <div className="mt-20">
            <DashboardNav />
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default DashbardLayout;
