"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function Page(){

const [roles,setRoles]=useState<any[]>([]);
const [permissions,setPermissions]=useState<any[]>([]);
const [search,setSearch]=useState("");

useEffect(()=>{
 loadRoles();
 loadPermissions();
},[]);

const loadRoles=async()=>{
 const res=await api.get("/v1/roles");
 setRoles(res.data.data);
};

const loadPermissions=async()=>{
 const res=await api.get("/v1/permissions");
 setPermissions(res.data.data);
};

const togglePermission=(role:any,permission:string)=>{

 let updated=[...role.permissions];

 if(updated.includes(permission)){
  updated=updated.filter((p)=>p!==permission);
 }else{
  updated.push(permission);
 }

 updateRole(role._id,updated);

};

const updateRole=async(roleId:string,permissions:any)=>{

 await api.put(`/v1/updateRolePermissions/${roleId}`,{
  permissions
 });

 loadRoles();

};

const groupedPermissions = permissions.reduce((acc:any,perm:any)=>{

 if(!acc[perm.module]){
  acc[perm.module]=[];
 }

 acc[perm.module].push(perm);

 return acc;

},{});

return(

<section className="content">

<div className="box">

<div className="box-header with-border">
<h3 className="box-title">Role & Permission Manager</h3>
</div>

<div className="box-body">

<div className="row" style={{marginBottom:"15px"}}>

<div className="col-md-4">
<input
type="text"
className="form-control"
placeholder="Search permission..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
</div>

</div>

{Object.keys(groupedPermissions).map(module=>{

const filteredPermissions = groupedPermissions[module].filter((perm:any)=>
perm.name.toLowerCase().includes(search.toLowerCase())
);

if(search && filteredPermissions.length === 0){
 return null;
}

return(

<div className="box box-primary" key={module}>

<div className="box-header with-border">
<h4 className="box-title">{module}</h4>
</div>

<div className="box-body table-responsive">

<table className="table table-bordered table-striped">

<thead>

<tr>
<th>Permission</th>

{roles.map(role=>(
<th key={role._id}>{role.name}</th>
))}

</tr>

</thead>

<tbody>

{(search ? filteredPermissions : groupedPermissions[module]).map((permission:any)=>(

<tr key={permission.name}>

<td>{permission.name}</td>

{roles.map(role=>(

<td key={role._id} style={{textAlign:"center"}}>

<input
type="checkbox"
checked={role.permissions?.includes(permission.name)}
onChange={()=>togglePermission(role,permission.name)}
/>

</td>

))}

</tr>

))}

</tbody>

</table>

</div>

</div>

)

})}

</div>

</div>

</section>

);

}
