import React from "react";
import Navbar from "../Components/Navbar";

const Users = () => {
  return (
    <div className="relative h-screen w-full bg-baseextra5">
      <Navbar />
      <div className="pt-16 flex flex-col h-full w-full p-4">
        {/* Flex container for horizontal layout */}
        <div className="flex w-full gap-4 mb-4 relative">
          {/* Users Container */}
          <div className="flex-1 flex flex-col items-center p-4 relative">
            <div className="w-full min-h-[600px] rounded-lg shadow-lg bg-baseextra4 flex flex-col items-center justify-start relative overflow-hidden border-2 border-baseprimary">
              {/* Add User Button */}
              <button className="absolute -left-1 bg-baseprimary text-white font-russoone text-lg py-4 px-16 rounded-br-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                Add Users
              </button>

              <h2 className="text-white font-russoone text-3xl font-bold mt-12 mb-2">
                Users
              </h2>
              <div className="w-1/2 h-1 bg-baseprimary animate-pulse"></div>
              <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
