"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";

const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("/");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSelectItem = (href: string) => {
    setSelectedItem(href);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <div className="md:hidden fixed top-0 left-0 z-50 p-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
          <GiHamburgerMenu className="text-darkRed text-3xl" />
        </button>
      </div>

      <Sidebar
        selectedItem={selectedItem}
        onSelect={handleSelectItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <MainContent selectedItem={selectedItem} />

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
