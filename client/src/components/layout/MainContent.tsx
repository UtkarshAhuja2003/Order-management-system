import React from "react";
import DashboardContent from "../Dashboard";
import OrdersContent from "../Orders";
import { Order } from "@/interfaces/order";

interface MainContentProps {
  selectedItem: string;
  orders: Order[];
}

const MainContent: React.FC<MainContentProps> = ({ selectedItem, orders }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case "/dashboard":
        return <DashboardContent orders={orders}/>;
      case "/orders":
        return <OrdersContent orders={orders}/>;
      default:
        return <DashboardContent orders={orders} />;
    }
  };

  return (
    <div className="flex-grow p-6 md:w-[80%] bg-grey">
      {renderContent()}
    </div>
  );
};

export default MainContent;
