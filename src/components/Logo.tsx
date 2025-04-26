
import React from "react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="p-1.5 rounded-lg bg-petroblue-600 text-white font-bold">
        <span className="text-2xl">P</span>
      </div>
      <div className="font-semibold text-xl">
        <span className="text-petroblue-700">PETRO</span>
        <span className="text-gray-700">SERVICES</span>
      </div>
    </div>
  );
};

export default Logo;
