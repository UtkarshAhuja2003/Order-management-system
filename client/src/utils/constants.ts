import { MdSpaceDashboard } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdRemoveShoppingCart } from "react-icons/md";
import { TbCalendarClock } from "react-icons/tb";
import { FaBoxArchive } from "react-icons/fa6";

export const SidebarItems = [
    {
        name: 'Dashboard',
        icon: MdSpaceDashboard,
        href: '/dashboard',
    },
    {
        name: 'Orders',
        icon: IoMdCart,
        href: '/orders',
    }
] as const;

export enum OrderStatus {
    CONFIRMED = 'CONFIRMED',
    REJECTED = 'REJECTED',
    PREPARING = 'PREPARING',
    READY = 'READY',
};

export const orderStatusConfig = {
    [OrderStatus.CONFIRMED]: {
      label: OrderStatus.CONFIRMED,
      className: 'bg-green-200 text-green-800',
      icon: BsFillCartCheckFill,
      iconColor: 'text-green-500',
    },
    [OrderStatus.REJECTED]: {
      label: OrderStatus.REJECTED,
      className: 'bg-red-200 text-red-800',
      icon: MdRemoveShoppingCart,
      iconColor: 'text-red-500',
    },
    [OrderStatus.PREPARING]: {
      label: OrderStatus.PREPARING,
      className: 'bg-yellow-200 text-yellow-800',
      icon: TbCalendarClock,
      iconColor: 'text-yellow-500',
    },
    [OrderStatus.READY]: {
      label: OrderStatus.READY,
      className: 'bg-blue-200 text-blue-800',
      icon: FaBoxArchive,
      iconColor: 'text-blue-500',
    },
};

export enum Timeframes {
    Today = 'today',
    LastWeek = 'lastWeek',
    LastMonth = 'lastMonth',
};