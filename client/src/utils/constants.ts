export const ORDER_STATUS_CHOICES = [
    'CONFIRMED',
    'REJECTED',
    'PREPARING',
    'READY',
] as const;

export type OrderStatus = typeof ORDER_STATUS_CHOICES[number];

import { MdSpaceDashboard } from "react-icons/md";
import { IoMdCart } from "react-icons/io";

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
