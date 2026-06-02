"use client";
import React, { useState } from "react";

export default function PriceListModal({ isOpen, onClose }:any) {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [active, setActive] = useState("Yes");
  const [description, setDescription] = useState("");
  const [showSaleBadge, setShowSaleBadge] = useState(false);

  // Tabs state
  const [activeTab, setActiveTab] = useState("inventory"); // "inventory" or "services"

  // Dummy data
  const inventoryItems = [
    { id: 1, sku: "SKU123", name: "Kumi Raspberry", price: 5.00 },
    { id: 2, sku: "SKU124", name: "[LV Demo] Choline Tablets 25lb", price: 89.00 },
    { id: 3, sku: "SKU125", name: "[LV Demo] Filter Cartridge - Standard", price: 45.00 },
    { id: 4, sku: "SKU126", name: "[LV Demo] Pump Kit", price: 120.00 },
    { id: 5, sku: "SKU127", name: "[LV Demo] Seltzer - Berry (12pk)", price: 18.00 },
  ];

  const servicesItems = [
    { id: 101, name: "Installation Service", price: 150.00 },
    { id: 102, name: "Annual Maintenance", price: 300.00 },
    { id: 103, name: "Repair Visit", price: 75.00 },
  ];

  // Selected items state
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

const addItem = (item: any) => {
  if (selectedItems.some((s) => s.id === item.id)) return;

  setSelectedItems([
    ...selectedItems,
    {
      ...item,
      discountPercent: 0,
      discountAmount: 0,
      finalPrice: item.price,
    },
  ]);
};

  const removeItem = (id:any) => {
    setSelectedItems(selectedItems.filter((s) => s.id !== id));
  };

  const updateDiscount = (id:any, field:any, value:any) => {
    setSelectedItems(
      selectedItems.map((s:any) =>
        s.id === id
          ? {
              ...s,
              [field]: parseFloat(value) || 0,
              finalPrice:
                field === "discountPercent"
                  ? s.price * (1 - parseFloat(value) / 100)
                  : field === "discountAmount"
                  ? s.price - parseFloat(value)
                  : s.finalPrice,
            }
          : s
      )
    );
  };

  const handleSave = () => {
    const data = {
      name,
      active,
      description,
      showSaleBadge,
      items: selectedItems,
    };
    console.log("Saving Price List:", data);
    alert("Price List Saved!");
    onClose();
  };

  const currentItems = activeTab === "inventory" ? inventoryItems : servicesItems;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
      <div className="modal-box">
        <div className="box-header with-border">
          <h3 className="box-title">New Price List</h3>
          <button className="btn btn-box-tool pull-right" onClick={onClose}><i className="fa fa-close" /></button>
        </div>
        

            <div className="box-body">
            {/* Top Form */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    className="form-control"
                    value={name}
                    onChange={(e:any) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Active</label>
                  <select
                    className="form-control"
                    value={active}
                    onChange={(e:any) => setActive(e.target.value)}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                rows={3}
                value={description}
                onChange={(e:any) => setDescription(e.target.value)}
              />
            </div>

            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={showSaleBadge}
                  onChange={(e:any) => setShowSaleBadge(e.target.checked)}
                />{" "}
                Show Sale badge in customer app when an item is discounted
              </label>
            </div>

            {/* Tabs + Items */}
            <h5 style={{ marginTop: "25px" }}>Items</h5>

            <ul className="nav nav-tabs">
              <li className={activeTab === "inventory" ? "active" : ""}>
                <a href="#" onClick={(e:any) => setActiveTab("inventory")}>
                  Inventory
                </a>
              </li>
              <li className={activeTab === "services" ? "active" : ""}>
                <a href="#" onClick={(e:any) => setActiveTab("services")}>
                  Services
                </a>
              </li>
            </ul>

            <div style={{ marginTop: "15px" }}>
              <div className="row">
                {/* Left - Available Items */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Search {activeTab === "inventory" ? "Inventory" : "Services"}...</label>
                    <input className="form-control" placeholder="Search..." />
                  </div>

                  <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
                    {currentItems.map((item:any) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 0",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <span>
                          {item.sku ? `[${item.sku}] ` : ""}
                          {item.name}
                        </span>
                        <button className="btn btn-xs btn-primary" onClick={() => addItem(item)}>
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right - Selected Items */}
                <div className="col-md-6">
                  <h5>Selected</h5>
                  {selectedItems.length === 0 ? (
                    <p className="text-muted">No items added yet.</p>
                  ) : (
                    <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", padding: "10px" }}>
                      {selectedItems.map((item:any) => (
                        <div key={item.id} style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <strong>{item.name}</strong>
                            <button className="btn btn-xs btn-danger" onClick={() => removeItem(item.id)}>
                              Remove
                            </button>
                          </div>

                          <div className="row" style={{ marginTop: "8px" }}>
                            <div className="col-md-4">
                              <label>Price</label>
                              <input
                                type="number"
                                className="form-control input-sm"
                                value={item.price}
                                readOnly
                              />
                            </div>
                            <div className="col-md-4">
                              <label>Discount %</label>
                              <input
                                type="number"
                                className="form-control input-sm"
                                value={item.discountPercent}
                                onChange={(e:any) => updateDiscount(item.id, "discountPercent", e.target.value)}
                              />
                            </div>
                            <div className="col-md-4">
                              <label>Discount $</label>
                              <input
                                type="number"
                                className="form-control input-sm"
                                value={item.discountAmount}
                                onChange={(e:any) => updateDiscount(item.id, "discountAmount", e.target.value)}
                              />
                            </div>
                          </div>

                          <div style={{ marginTop: "8px", fontWeight: "bold" }}>
                            Final Price: ${item.finalPrice.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-default" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>

    
    </div>
    </div>

 <style jsx global>{`
     .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .modal-dialog {
          width: auto;
          max-width: 1200px;
          margin: 20px auto;
          max-height: 92vh;         /* screen ke andar rahega */

          overflow-y: scroll;  
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          overflow: hidden;          /* bahar nikalne se rokega */
        }

        .modal-header {
          padding: 16px 24px;
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;           /* sirf yeh scroll karega */
          max-height: calc(92vh - 130px);  /* header + footer ke liye jagah */
        }

        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #dee2e6;
          text-align: right;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 32px;
          font-weight: bold;
          cursor: pointer;
          color: #333;
        }

        .close-btn:hover {
          color: #000;
        }

        /* Body scroll band - CSS se hi */
        :global(body:has(.modal-overlay)) {
          overflow: hidden;
        }
      `}</style>
    </div>
    
  );
}
