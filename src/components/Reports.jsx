import React from "react";
import { FileBarChart, AlertCircle, Clock } from "lucide-react";

const Reports = () => {
  return (
    <section className="max-w-screen-lg mx-auto px-4 py-16">
      <div className="bg-secondary/40 backdrop-blur-sm border border-light/10 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center animate-pulse opacity-20">
              <FileBarChart size={120} className="text-purple" />
            </div>
            <FileBarChart size={80} className="text-purple relative z-10" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-light mb-4">
            No Reports Available Yet
          </h2>
          <div className="mt-8">
            <button
              onClick={() => (window.location.href = "/dashboard/overview")}
              className="px-6 py-3 bg-purple/20 hover:bg-purple/30 border border-purple/40 text-purple rounded-lg transition-all duration-300 font-medium"
            >
              Return to Overview
            </button>
          </div>
        </div>

        <div className="h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple"></div>
      </div>
    </section>
  );
};

export default Reports;
