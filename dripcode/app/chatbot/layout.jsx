import React from "react";

const ChatbotLayout = ({ children }) => {
  return (
    <div className="bg-[#0f172a] min-h-screen [&::-webkit-scrollbar]:hidden">
      {children}
    </div>
  );
};

export default ChatbotLayout;
