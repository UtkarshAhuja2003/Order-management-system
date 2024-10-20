import { Order } from "@/interfaces/order";
import OrderSummary from "./OrderSummary";

const DashboardContent: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <div>
        <OrderSummary orders={orders}/>
    </div>
  )
}

export default DashboardContent;