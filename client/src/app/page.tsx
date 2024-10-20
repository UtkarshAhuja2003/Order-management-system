"use client";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";
import { getAllOrders } from "@/api/order";
import { Order } from "@/interfaces/order";
import { useBanner } from "@/hooks/useBanner";
import Banner from "@/components/common/Banner";

const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("/dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { banner, showBanner, closeBanner } = useBanner();

  const handleSelectItem = (href: string) => {
    setSelectedItem(href);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getAllOrders();
      if (data.data) {
        setOrders(data.data);
      } else {
        showBanner('error', 'Failed to load orders');
      }
    };
    loadOrders();
  }, []);

  return (
    <div className="flex min-h-screen">
      {banner.isVisible && banner.type && <Banner message={banner.message} onClose={closeBanner} type={banner.type} />}
      <div className="md:hidden fixed top-0 left-0 z-50 p-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
          <GiHamburgerMenu className="text-darkBlue text-3xl" />
        </button>
      </div>

      <Sidebar
        selectedItem={selectedItem}
        onSelect={handleSelectItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <MainContent selectedItem={selectedItem} orders={orders}/>

      {sidebarOpen && (
        <div
          className="fixed inset-0 opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
