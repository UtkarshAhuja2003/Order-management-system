import React from "react";
import DashboardContent from "../Dashboard";
import OrdersContent from "../Orders";

interface MainContentProps {
  selectedItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ selectedItem }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case "/dashboard":
        return <DashboardContent />;
      case "/orders":
        return <OrdersContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex-grow p-6 md:w-[80%]">
      {renderContent()}
    </div>
  );
};

export default MainContent;
