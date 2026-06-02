"use client"
import React from 'react'
import { useUser } from "@/context/userContext";

export default function aside() {
  const user = useUser();
  console.log(user)
	return (
		<div>
		  <aside className="main-sidebar">
    {/* sidebar: style can be found in sidebar.less */}
    <section className="sidebar">
      {/* Sidebar user panel */}
      <div className="user-panel">
        <div className="pull-left image">
          <img
            src="../../dist/img/user2-160x160.jpg"
            className="img-circle"
            alt="User Image"
          />
        </div>
        <div className="pull-left info">
          <p>{user?.name}</p>
          <a href="#">
            <i className="fa fa-circle text-success" /> {user?.role}
          </a>
        </div>
      </div>
    
      {/* /.search form */}
      {/* sidebar menu: : style can be found in sidebar.less */}
      <ul className="sidebar-menu">
        <li className="header">MAIN NAVIGATION</li>
      
        <li className="treeview">
          <a href="/dashboard"> 
            <i className="fa fa-circle-o" /> 
            <span>Dashboard</span> 
          </a>
          
        </li>
      {/*  <li className="treeview">
          <a href="/estimates-quotes"> 
          <i className="fa fa-circle-o" /> 
            <span>Estimate & Quotes</span> 
          </a>
          </li>*/}
        
        <li className="treeview">
          <a href="/jobs"> 
          <i className="fa fa-circle-o" /> 
            <span>Jobs</span> 
          </a>
        </li>
        {/*<li className="treeview">
          <a href="#"> 
          <i className="fa fa-circle-o" /> 
            <span>Schedule</span> 
          </a>
        </li>*/}
        <li className="treeview">
          <a href="/dispatch"> 
          <i className="fa fa-circle-o" /> 
            <span>Dispatch</span> 
          </a>
        </li>
        <li className="treeview">
          <a href="/accounts"> 
          <i className="fa fa-circle-o" /> 
            <span>Accounts</span> 
          </a>
        </li>
        <li className="treeview">
          <a href="/clients"> 
          <i className="fa fa-circle-o" /> 
            <span>Service Locations</span> 
          </a>
        </li>
        <li className="treeview">
          <a href="#"> 
          <i className="fa fa-circle-o" /> 
            <span>Inventory</span> 
          </a>
        </li>
        <li className="treeview">
          <a href="#"> 
          <i className="fa fa-circle-o" /> 
            <span>Billing</span> 
          </a>
        </li>

        <li className="treeview">
          <a href="#"> 
          <i className="fa fa-circle-o" /> 
            <span>Reports</span> 
          </a>
        </li>
        
          </ul> 
         
        
           
    </section>
    {/* /.sidebar */}
  </aside> 
			
		</div>
	)
}