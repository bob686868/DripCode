import React from "react";

const Logo = () => (
  <div className="flex items-center space-x-1">
    {/* Droplet icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-neutral-100"
    >
      <path d="M12 2C7.58 2 4 5.58 4 10c0 4.55 3.54 8.21 8 8.94V22h2v-3.06c4.46-.73 8-4.39 8-8.94 0-4.42-3.58-8-8-8z" />
    </svg>
    <span className="text-neutral-100 font-bold text-xl">DC</span>
  </div>
);

export default Logo;
