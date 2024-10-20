import { Order } from "@/interfaces/order";
import OrderSummary from "./OrderSummary";
import Updates from "./Updates";

const DashboardContent: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <div>
        <OrderSummary orders={orders}/>
        <Updates orders={orders}/>
    </div>
  )
}

export default DashboardContent;