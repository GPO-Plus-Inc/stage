"use client";
import React, { useState } from "react";
import PriceListModal from "@/component/pricelistComponent/PriceList";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  return ( 
   
    <section className="content">
      {/* Default box */}
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Price List</h3>
          <div className="box-tools pull-right"> 
           <div className="pull-right">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + New Price List
            </button>
          </div>
          </div>
        </div>
       <div className="box-body">
          <p>No price lists yet.</p>
        </div>
        {/* /.box-body */}
        <div className="box-footer">Footer</div>
        {/* /.box-footer*/}
      </div>
        <PriceListModal isOpen={showModal} onClose={() => setShowModal(false)} />
      {/* /.box */}
    </section>
  )
}