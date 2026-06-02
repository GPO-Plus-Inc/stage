"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";

export default function Page() {

const [loading,setLoading] = useState(false);

const [connection,setConnection] = useState({
 client_id:"",
 client_secret:"",
 refresh_token:"",
 api_domain:"https://www.zohoapis.com"
});

const [mapping,setMapping] = useState({
 company:"",
 first_name:"",
 last_name:"",
 email:"",
 phone:"",
 address:"",
 city:"",
 state:"",
 zip:""
});

const [accountFields,setAccountFields] = useState<any[]>([]);
const [contactFields,setContactFields] = useState<any[]>([]);

const [syncDirection,setSyncDirection] = useState("push");


// ================= HANDLERS =================

const handleConnectionChange = (e:any)=>{
 setConnection({
  ...connection,
  [e.target.name]:e.target.value
 });
};

const handleMappingChange = (e:any)=>{
 setMapping({
  ...mapping,
  [e.target.name]:e.target.value
 });
};


// ================= API CALLS =================

// SAVE CONNECTION
const saveConnection = async(e:any)=>{
 e.preventDefault();
 setLoading(true);

 try{
  await api.post("/v1/zoho",connection);
  alert("Connection saved");
 }catch(err:any){
  alert(err.response?.data?.message || "Error saving connection");
 }

 setLoading(false);
};


// TEST CONNECTION
const testConnection = async()=>{
 setLoading(true);

 try{
  await api.post("/v1/zoho/test");
  alert("Connection successful");
 }catch(err:any){
  alert(err.response?.data?.message || "Connection failed");
 }

 setLoading(false);
};


// LOAD FIELDS
const loadFields = async()=>{
 setLoading(true);

 try{
  const res = await api.get("/v1/zoho/fields");

  setAccountFields(res.data.accounts || []);
  setContactFields(res.data.contacts || []);

  alert("CRM fields loaded");

 }catch(err:any){
  alert(err.response?.data?.message || "Failed loading CRM fields");
 }

 setLoading(false);
};


// SAVE MAPPING
const saveMappings = async()=>{
 setLoading(true);

 try{
  await api.post("/v1/zoho/mappings",mapping);
  alert("Mappings saved");
 }catch(err:any){
  alert(err.response?.data?.message || "Error saving mappings");
 }

 setLoading(false);
};


// SYNC
const syncLocations = async()=>{
 setLoading(true);

 try{
  await api.post("/v1/zoho/sync",{
   direction:syncDirection
  });

  alert("Sync started");

 }catch(err:any){
  alert(err.response?.data?.message || "Sync failed");
 }

 setLoading(false);
};

const loadConnection = async()=>{
 try{

  const res = await api.get("/v1/zoho");

  if(res.data){
   setConnection({
    client_id:res.data.client_id || "",
    client_secret:res.data.client_secret || "",
    refresh_token:res.data.refresh_token || "",
    api_domain:res.data.api_domain || "https://www.zohoapis.com"
   });
  }

 }catch(err){
  console.log("Load connection error",err);
 }
};

useEffect(()=>{
 loadConnection();
},[]);


// ================= UI =================

return (

<section className="content">

{loading && (
 <div style={{padding:"10px",color:"blue"}}>
  ⏳ Processing...
 </div>
)}

{/* CONNECTION */}

<div className="box">

<div className="box-header with-border">
<h3 className="box-title">Connection</h3>
</div>

<div className="box-body">

<form onSubmit={saveConnection}>

<div className="row">

<div className="col-xs-5 form-group">
<label>Client ID</label>
<input
className="form-control"
name="client_id"
value={connection.client_id}
onChange={handleConnectionChange}
/>
</div>

<div className="col-xs-5 form-group">
<label>Client Secret</label>
<input
className="form-control"
name="client_secret"
value={connection.client_secret}
onChange={handleConnectionChange}
/>
</div>

<div className="col-xs-5 form-group">
<label>Refresh Token</label>
<input
className="form-control"
name="refresh_token"
value={connection.refresh_token}
onChange={handleConnectionChange}
/>
</div>

<div className="col-xs-5 form-group">
<label>API Domain</label>
<input
className="form-control"
name="api_domain"
value={connection.api_domain}
onChange={handleConnectionChange}
/>
</div>

</div>

<button className="btn btn-primary" disabled={loading}>
<i className="fa fa-save"/> Save
</button>

<button
type="button"
className="btn btn-success"
style={{marginLeft:"10px"}}
onClick={testConnection}
disabled={loading}
>
<i className="fa fa-check"/> Test Connection
</button>

</form>

</div>

</div>


{/* FIELD MAPPING */}

<div className="box">

<div className="box-header with-border">
<h3 className="box-title">Field Mapping</h3>
</div>

<div className="box-body">

<button
className="btn btn-info"
onClick={loadFields}
disabled={loading}
>
Load CRM Fields
</button>

<hr/>

<h4>Standard Fields</h4>

<div className="row">

<div className="col-xs-4 form-group">
<label>Company (Location) → Accounts</label>
<select
className="form-control"
name="company"
value={mapping.company}
onChange={handleMappingChange}
>
<option>Select field...</option>
{accountFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

<div className="col-xs-4 form-group">
<label>Primary First Name → Contacts</label>
<select
className="form-control"
name="first_name"
value={mapping.first_name}
onChange={handleMappingChange}
>
<option>Select field...</option>
{contactFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

<div className="col-xs-4 form-group">
<label>Primary Last Name → Contacts</label>
<select
className="form-control"
name="last_name"
value={mapping.last_name}
onChange={handleMappingChange}
>
<option>Select field...</option>
{contactFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

<div className="col-xs-4 form-group">
<label>Email → Contacts</label>
<select
className="form-control"
name="email"
value={mapping.email}
onChange={handleMappingChange}
>
<option>Select field...</option>
{contactFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

<div className="col-xs-4 form-group">
<label>Phone → Contacts</label>
<select
className="form-control"
name="phone"
value={mapping.phone}
onChange={handleMappingChange}
>
<option>Select field...</option>
{contactFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

<div className="col-xs-4 form-group">
<label>Address → Accounts</label>
<select
className="form-control"
name="address"
value={mapping.address}
onChange={handleMappingChange}
>
<option>Select field...</option>
{accountFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

<div className="col-xs-4 form-group">
<label>City → Accounts</label>
<select
className="form-control"
name="city"
value={mapping.city}
onChange={handleMappingChange}
>
<option>Select field...</option>
{accountFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

<div className="col-xs-4 form-group">
<label>State → Accounts</label>
<select
className="form-control"
name="state"
value={mapping.state}
onChange={handleMappingChange}
>
<option>Select field...</option>
{accountFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

<div className="col-xs-4 form-group">
<label>ZIP → Accounts</label>
<select
className="form-control"
name="zip"
value={mapping.zip}
onChange={handleMappingChange}
>
<option>Select field...</option>
{accountFields.map((f:any)=>(
<option key={f.api_name} value={f.api_name}>
{f.field_label}
</option>
))}
</select>
</div>

</div>

<button
className="btn btn-primary"
onClick={saveMappings}
disabled={loading}
>
Save Mappings
</button>

</div>

</div>


{/* SYNC */}

<div className="box">

<div className="box-header with-border">
<h3 className="box-title">Sync</h3>
</div>

<div className="box-body">

<div className="form-group">
<label>Sync Direction</label>

<select
className="form-control"
value={syncDirection}
onChange={(e)=>setSyncDirection(e.target.value)}
>

<option value="push">
Push (send data from here to Zoho)
</option>

<option value="pull">
Pull (fetch data from Zoho)
</option>

<option value="both">
Both (push and pull)
</option>

</select>

</div>

<button
className="btn btn-success"
onClick={syncLocations}
disabled={loading}
>
Sync all service locations now
</button>

</div>

</div>

</section>
);
}