"use client"
import React, { useState } from "react";

const CreateEstimate = () => {
  const [item, setItem] = useState({
    description: "",
    qty: 1,
    price: 0,
    taxed: false,
  });

interface EstimateItem {
  description: string;
  qty: number;
  price: number;
  taxed: boolean;
  total: number;
}

const [items, setItems] = useState<EstimateItem[]>([]);

  // Add Item
const handleAdd = () => {
  if (!item.description) return;

  const total = item.qty * item.price;
  const taxAmount = item.taxed ? total * 0.18 : 0;

  setItems([
    ...items,
    {
      ...item,
      total: total + taxAmount,
    },
  ]);

  setItem({
    description: "",
    qty: 1,
    price: 0,
    taxed: false,
  });
};

  // Remove Item
const handleRemove = (index: number) => {
  const updated = items.filter((_, i) => i !== index);
  setItems(updated);
};
  return (
    <section className="col-lg-6 connectedSortable ui-sortable">
      <div className="box box-solid border rounded shadow-sm bg-white">
        
        {/* Header */}
        <div className="ui-sortable-handle content-header nav nav-tabs nav-tabs-custom border-bottom d-flex justify-content-between align-items-center px-3">
          <p className="mb-0 fw-bold">Create Estimates</p>

         
        </div>

        {/* Body */}
        <div className="box-body p-3">
          <div className="form">
            
            {/* Client */}
            <div className="form-group mb-3">
              <label className="fw-semibold">Client</label>

              <select className="form-control">
                <option>Select Client</option>
                <option>Rahul Sharma</option>
                <option>Amit Kumar</option>
                <option>Tech Solutions</option>
              </select>
            </div>

            {/* Tax */}
            <div className="form-group mb-3">
              <label className="fw-semibold">Tax %</label>

              <div className="row">
                <div className="col-xs-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="18%"
                  />
                </div>
              </div>
            </div>

            {/* Shipping & Discount */}
            <div className="form-group mb-3">
              <div className="row">
                
                <div className="col-xs-3">
                  <label className="fw-semibold">Shipping</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="0"
                  />
                </div>

                <div className="col-xs-4">
                  <label className="fw-semibold">Discount</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="form-group mb-3">
              <label className="fw-semibold">Notes (Optional)</label>

              <textarea
                className="form-control"
                rows={4}
              ></textarea>
            </div>

            {/* Item Fields */}
            <div className="form-group mb-3">
              <div className="row">
                
                {/* Description */}
                <div className="col-md-4">
                  <label className="fw-semibold">Description</label>

                  <input
                    type="text"
                    className="form-control"
                    value={item.description}
                    onChange={(e:any) =>
                      setItem({
                        ...item,
                        description: e.target.value,
                      })
                    }
                    placeholder="Description"
                  />
                </div>

                {/* Qty */}
                <div className="col-md-2">
                  <label className="fw-semibold">QTY</label>

                  <input
                    type="number"
                    className="form-control"
                    value={item.qty}
                    onChange={(e:any) =>
                      setItem({
                        ...item,
                        qty: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* Unit Price */}
                <div className="col-md-3">
                  <label className="fw-semibold">Unit Price</label>

                  <input
                    type="number"
                    className="form-control"
                    value={item.price}
                    onChange={(e:any) =>
                      setItem({
                        ...item,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>

                {/* Taxed */}
                <div className="col-md-1 d-flex align-items-end">
                  <label className="mt-4">
                    <input
                      type="checkbox"
                      checked={item.taxed}
                      onChange={(e:any) =>
                        setItem({
                          ...item,
                          taxed: e.target.checked,
                        })
                      }
                    />{" "}
                    Taxed
                  </label>
                </div>

                {/* Add Btn */}
                <div className="col-md-2 d-flex align-items-end">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleAdd}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            {items.length > 0 && (
              <div className="table-responsive mt-4">
                <table className="table table-bordered table-hover">
                  <thead className="bg-light">
                    <tr>
                      <th>Description</th>
                      <th>QTY</th>
                      <th>Unit Price</th>
                      <th>Taxed</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((data:any, index:any) => (
                      <tr key={index}>
                        
                        <td>{data.description}</td>

                        <td>{data.qty}</td>

                        <td>₹{data.price}</td>

                        <td>
                          {data.taxed ? (
                            <span className="label label-success">
                              Yes
                            </span>
                          ) : (
                            <span className="label label-default">
                              No
                            </span>
                          )}
                        </td>

                        <td>
                          ₹{data.total.toFixed(2)}
                        </td>

                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleRemove(index)
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Final Submit */}
            <div className="text-end mt-4">
              <button className="btn btn-success px-4">
                Create Estimate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEstimate;