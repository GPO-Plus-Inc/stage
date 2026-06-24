"use client";

import React, { useState } from "react";

import Items from "@/component/inventory/Items";
import Planograms from "@/component/inventory/Planograms";
import JobsiteEquipment from "@/component/inventory/JobsiteEquipment";
import JobsiteAssets from "@/component/inventory/JobsiteAssets";
import InventoryLocations from "@/component/inventory/InventoryLocations";
import Services from "@/component/inventory/Services";

export default function Page() {
  const [activeTab, setActiveTab] = useState("items");

  const tabs = [
    { key: "items", label: "Items" },
    { key: "planograms", label: "Planograms" },
    { key: "jobsite-equipment", label: "Jobsite Equipment" },
    { key: "jobsite-assets", label: "Jobsite Assets" },
    { key: "inventory-locations", label: "Inventory Locations" },
    { key: "services", label: "Services" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "items":
        return <Items />;

      case "planograms":
        return <Planograms />;

      case "jobsite-equipment":
        return <JobsiteEquipment />;

      case "jobsite-assets":
        return <JobsiteAssets />;

      case "inventory-locations":
        return <InventoryLocations />;

      case "services":
        return <Services />;

      default:
        return <Items />;
    }
  };

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <section className="content-header">
        <h1>Inventory</h1>
      </section>

      {/* Main Content */}
      <section className="content">
        {/* Tabs */}
        <div className="box box-solid border rounded shadow-sm bg-white mb-4">
          <div className="box-body">
            <div className="flex flex-wrap gap-2"   style={{
                display: "flex",
                gap: "5px",
                flexWrap: "wrap",
              }}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={` btn pull-left   ${
                    activeTab === tab.key
                      ? "btn-danger"
                      : "btn-default"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Component Render Area */}
        <div className="box box-solid border rounded shadow-sm bg-white">
          <div className="box-body p-4">{renderContent()}</div>
        </div>
      </section>
    </div>
  );
}