import React, { useState } from "react";
import { features } from "../../main";
import { motion } from "motion/react";
import { easeOut } from "motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <main>
        <div className="fixed inset-0 z-0 bg-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_150%,rgba(34,197,94,0.3),rgba(255,255,255,0))]" />
        </div>
        <div className="absolute top-0 z-0 h-screen w-screen  bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: easeOut, duration: 0.5 }}
          className="ml-4 lg:ml-0 text-light flex justify-center min-h-1/2 mt-20 flex-col"
        >
          <div className="text-center space-y-8 z-10">
            <h1 className="font-bold text-6xl">
              Take Control of Your {""}
              <div className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-800 relative inline-block mb-8">
                <p className="flex items-center flex-col ">
                  Finances
                  <svg
                    className="absolute  -bottom-5 -z-10 w-full"
                    viewBox="0 0 240 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10,15 Q60,5 120,10 Q180,15 230,5"
                      stroke="#22c55e"
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </p>
              </div>
            </h1>
            <p className="text-light/50 lg:w-1/3 lg:mx-auto mr-8">
              Track your expenses, set budgets, and achieve your financial goals
              with our intuitive finance tracker.
            </p>
            <Link
              to={"/dashboard"}
              className="bg-light text-primary w-fit mx-auto flex items-center py-4 px-6 hover:bg-light/70 transition-colors duration-150 ease-out rounded-lg space-x-1 group drop-shadow-button outline-none"
            >
              <p className="">Dashboard</p>
              <img
                src="/public/staticArrow.svg"
                alt=""
                className="group-hover:translate-x-0.5 transition-all duration-150 ease-out"
              />
            </Link>
            <div className="mt-40"></div>
          </div>
          <h1 className="font-bold text-3xl text-light lg:text-center ml-4 my-8 z-10">
            Everything you need to manage your money
          </h1>
        </motion.div>
        <div className=" flex flex-col items-center justify-center text-light   relative">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-4">
            {features.map((feature, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    ease: easeOut,
                    delay: index * 0.2,
                    duration: 0.5,
                  }}
                  key={index}
                  className=" bg-primary/50  space-y-4 p-6  rounded-lg w-80 m-4 border border-light/10 hover:border-light/40 transition-all duration-150 ease-out"
                >
                  <div className="bg-gradient-to-br from-slate-950 to-slate-800 border drop-shadow-icon shadow-icon border-white/20 p-4 rounded-lg  w-fit">
                    <feature.icon size={30} />
                  </div>
                  <h1 className="text-xl font-bold">{feature.title}</h1>

                  <div className="text-light/50">{feature.description}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="my-12 bg-gradient-to-r from-green-800/40 to-blue-950/40 relative space-y-8 flex flex-col text-light justify-center w-[90%] xl:w-[60%] mx-auto px-12 py-8 rounded-xl ">
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 20, repeat: Infinity }}
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.2" fill-rule="evenodd"%3E%3Cpath d="M0 40L40 0H20L0 20M40 40V20L20 40"%3E%3C/path%3E%3C/g%3E%3C/svg%3E\')',
              backgroundSize: "40px 40px",
            }}
          />
          <h1 className="font-bold text-3xl lg:text-5xl text-center text-pretty z-10">
            Ready to take control of your finances?
          </h1>
          <p className="text-center text-light/50 z-10">
            Join thousands of users who are already managing their money better
            with MoneyMap.
          </p>
          <Link
            to={"/dashboard"}
            className="bg-light z-10 text-primary w-fit mx-auto flex items-center py-4 px-6 hover:bg-light/70 transition-colors duration-150 ease-out  rounded-lg space-x-1 group drop-shadow-button outline-none"
          >
            <p className="">Get Started</p>
            <img
              src="/public/staticArrow.svg"
              alt=""
              className=" group-hover:translate-x-0.5 transition-all duration-150 ease-out"
            />
          </Link>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
