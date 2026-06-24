"use client";
import React, { useState, useEffect } from "react";
import JobType from "@/component/templateComponent/JobType"
import NotificationTemplate from "@/component/templateComponent/NotificationTemplate"
import api from "@/lib/axios";

// ====================== FULL INVOICE MODAL (sab fields + live preview) ======================
const InvoiceCreateModal = ({ isOpen, onClose }:any) => {
  // ALL STATES (no field skipped)
  const [templateName, setTemplateName] = useState("");
  const [templateType, setTemplateType] = useState<number>(1);
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [headerLogoUrl, setHeaderLogoUrl] = useState("");
  const [headerColor, setHeaderColor] = useState("#1e3a8a");
  const [accentColor, setAccentColor] = useState("#3b82f6");
  const [showPricing, setShowPricing] = useState(true);
  const [showDueDate, setShowDueDate] = useState(true);
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [includeNotes, setIncludeNotes] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);
  const [footerText, setFooterText] = useState("Thank you for your business!");
  const [invoiceDate, setInvoiceDate] = useState("3/23/2026");
  const [dueDate, setDueDate] = useState("4/22/2026");



  const handleSave = async () => {
    if (!templateName.trim()) {
      alert("Template Name is required!");
      return;
    }

    const data = {
      templateName,
      templateType,
      companyName,
      address,
      phone,
      email,
      headerLogoUrl,
      headerColor,
      accentColor,
      showPricing,
      showDueDate,
      paymentTerms,
      includeNotes,
      includeSignature,
      footerText,
      defaultInvoiceDate: invoiceDate,
      defaultDueDate: dueDate,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post("/v1/templateAdd",data) 
        alert("Invoice Template Saved to Database!");
    } catch (err) {
      console.error(err);
      alert("Error saving to DB");
    }
  };

  if (!isOpen) return null;



  return (
 <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
      <div className="modal-box">
        <div className="box-header with-border">
          <h3 className="box-title">Create New Template</h3>
          <button className="btn btn-box-tool pull-right" onClick={onClose}><i className="fa fa-close" /></button>
        </div>

        <div className="box-body">
          <div className="row">
            {/* LEFT COLUMN - ALL INPUTS */}
            <div className="col-md-6">
              {/* Basic Information */}
              <h4>Basic Information</h4>
              <div className="form-group">
                <label>Template Name <span style={{color:"red"}}>*</span></label>
                <input className="form-control" value={templateName} onChange={e => setTemplateName(e.target.value)} placeholder="template name" />
              </div>
              <div className="form-group">
                <label>Template Type</label>
                <select className="form-control" value={templateType} onChange={(e) => setTemplateType(Number(e.target.value))}>
                   <option value={1}>Invoice (without pricing)</option>
                  <option value={2}>Service Report</option>
                </select>
              </div>

              {/* Company Information */}
              <h4 style={{marginTop:"25px"}}>Company Information</h4>
              <div className="form-group">
                <label>Company Name</label>
                <input className="form-control" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="company name" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea className="form-control" rows={3} value={address} onChange={e => setAddress(e.target.value)} placeholder="address details" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Phone</label>
                  <input className="form-control" value={phone} onChange={e => setPhone(e.target.value)} placeholder="phone number" />
                </div>
                <div className="col-md-6">
                  <label>Email</label>
                  <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                </div>
              </div>

              {/* Design & Colors */}
              <h4 style={{marginTop:"25px"}}>Design & Colors</h4>
              <div className="form-group">
                <label>Header Logo URL (overrides default)</label>
                <input className="form-control" value={headerLogoUrl} onChange={e => setHeaderLogoUrl(e.target.value)} placeholder="url logo" />
              </div>
              <div className="form-group">
                <button className="btn btn-default btn-block">Upload from URL & host</button>
              </div>
              <div className="form-group">
                <label>Choose File</label>
                <input type="file" className="form-control" />
              </div>
              <div className="checkbox">
                <label><input type="checkbox" /> Use organization logo</label>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Header Color</label>
                  <input type="color" value={headerColor} onChange={e => setHeaderColor(e.target.value)} style={{width:"100%", height:"38px"}} />
                </div>
                <div className="col-md-6">
                  <label>Accent Color</label>
                  <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={{width:"100%", height:"38px"}} />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - OPTIONS + LIVE PREVIEW */}
            <div className="col-md-6">
              <h4>Template Options</h4>
              <div className="checkbox"><label><input type="checkbox" checked={showPricing} onChange={e=>setShowPricing(e.target.checked)} /> Show pricing information</label></div>
              <div className="checkbox"><label><input type="checkbox" checked={showDueDate} onChange={e=>setShowDueDate(e.target.checked)} /> Show due date</label></div>
              <div className="form-group">
                <label>Payment Terms</label>
                <select className="form-control" value={paymentTerms} onChange={e=>setPaymentTerms(e.target.value)}>
                  <option>Net 30</option>
                  <option>Due on Receipt</option>
                  <option>Net 15</option>
                  <option>Net 7</option>
                </select>
              </div>
              <div className="checkbox"><label><input type="checkbox" checked={includeNotes} onChange={e=>setIncludeNotes(e.target.checked)} /> Include notes section</label></div>
              <div className="checkbox"><label><input type="checkbox" checked={includeSignature} onChange={e=>setIncludeSignature(e.target.checked)} /> Include signature section</label></div>

              <h4 style={{marginTop:"25px"}}>Footer</h4>
              <textarea className="form-control" rows={2} value={footerText} onChange={e=>setFooterText(e.target.value)} />

              <h4 style={{marginTop:"25px"}}>Live Preview</h4>
              <div style={{border:"1px solid #ddd", borderRadius:"6px", overflow:"hidden", background:"#fff", boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
                <div style={{background:headerColor, color:"white", padding:"20px", display:"flex", justifyContent:"space-between"}}>
                  <div>
                    <strong style={{fontSize:"24px"}}>{templateType===1 ? "INVOICE" : "SERVICE REPORT"}</strong>
                    <div style={{fontSize:"13px", marginTop:"8px"}}>
                      {companyName || "company name"}<br />
                      {address || "address details"}<br />
                      {phone || email ? `${phone} • ${email}` : "phone number • email"}
                    </div>
                  </div>
                  {headerLogoUrl && <img src={headerLogoUrl} style={{maxHeight:"60px"}} alt="logo" />}
                </div>

                <div style={{padding:"20px"}}>
                  <div style={{display:"flex", justifyContent:"space-between", marginBottom:"16px"}}>
                    <div><strong>Bill To:</strong><br />Sample Customer<br />123 Customer St<br />City, State 12345</div>
                    <div style={{textAlign:"right"}}>
                      Date: {invoiceDate}<br />
                      {showDueDate && `Due Date: ${dueDate}`}
                    </div>
                  </div>

                  {showPricing && (
                    <table style={{width:"100%", borderCollapse:"collapse", margin:"16px 0"}}>
                      <thead>
                        <tr style={{background: accentColor + "22"}}>
                          <th style={{padding:"10px", textAlign:"left"}}>Description</th>
                          <th style={{padding:"10px"}}>Qty</th>
                          <th style={{padding:"10px"}}>Rate</th>
                          <th style={{padding:"10px", textAlign:"right"}}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{padding:"10px"}}>Sample Service Item</td><td style={{padding:"10px"}}>1</td><td style={{padding:"10px"}}>$100.00</td><td style={{padding:"10px", textAlign:"right"}}>$100.00</td></tr>
                      </tbody>
                    </table>
                  )}

                  <div style={{textAlign:"right", fontWeight:"bold"}}>Subtotal: $100.00<br />Total: $100.00</div>

                  {includeSignature && <div style={{marginTop:"30px"}}><strong>Customer Signature:</strong> ___________________________<br />Date: ________________</div>}

                  <div style={{marginTop:"30px", textAlign:"center", color:"#555", fontSize:"13px"}}>{footerText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{textAlign:"right", padding:"15px", borderTop:"1px solid #eee"}}>
          <button className="btn btn-default" onClick={onClose}>Cancel</button>{" "}
          <button className="btn btn-primary" onClick={handleSave}>Create Template</button>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

// ====================== FULL JOB MODAL ======================
const JobCreateModal = ({ isOpen, onClose }:any) => {
  const [templateName, setTemplateName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [checklist, setChecklist] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [defaultInvoice, setDefaultInvoice] = useState("");
  const [defaultReport, setDefaultReport] = useState("");

  const [templateList, setTemplateList] = useState<any[]>([]);

  const invoiceTemplates = templateList.filter(
  (item) => Number(item.templateType) === 1
);

const serviceReportTemplates = templateList.filter(
  (item) => Number(item.templateType) === 2
);

const getTemplateList = async () => {
  try {
    const res = await api.get("/v1/templateList");
    setTemplateList(res.data.data || []);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getTemplateList();
}, []);

  const addItem = () => {
    if (newItem.trim()) {
      setChecklist([...checklist, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleSaveJob = async () => {
    if (!templateName || !jobTitle) {
      alert("Template Name and Job Title required!");
      return;
    }
 

    try {
      const res =  await api.post("/v1/jobtemplateAdd", {
  templateName,
  jobTitle,
  jobDescription,
  checklist,
  defaultInvoice,
  defaultReport,
});
        alert("Job Template Saved to Database!"); 
    } catch (err) {
      alert("Error saving Job Template");
    }
  };

  if (!isOpen) return null;

  return (
   <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
      <div className="modal-box">
        <div className="box-header with-border">
          <h3 className="box-title">Create New Template</h3>
          <button className="btn btn-box-tool pull-right" onClick={onClose}><i className="fa fa-close" /></button>
        </div>

        <div className="box-body">
          <div className="row">
          <div className="form-group">
            <label>Template Name <span style={{color:"red"}}>*</span></label>
            <input className="form-control" value={templateName} onChange={e=>setTemplateName(e.target.value)} placeholder="e.g. Standard Maintenance" />
          </div>
          <div className="form-group">
            <label>Job Title <span style={{color:"red"}}>*</span></label>
            <input className="form-control" value={jobTitle} onChange={e=>setJobTitle(e.target.value)} placeholder="e.g. HVAC System Maintenance" />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea className="form-control" rows={4} value={jobDescription} onChange={e=>setJobDescription(e.target.value)} placeholder="Describe the work to be performed..." />
          </div>

          <div className="form-group">
            <label>Checklist Items</label>
            {checklist.map((item, i) => (
              <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"6px", background:"#f9f9f9", marginBottom:"4px"}}>
                <span>{item}</span>
                <button className="btn btn-xs btn-danger" onClick={() => setChecklist(checklist.filter((_,idx)=>idx!==i))}>Remove</button>
              </div>
            ))}
            <div style={{display:"flex", gap:"8px"}}>
              <input className="form-control" value={newItem} onChange={e=>setNewItem(e.target.value)} placeholder="Add checklist item..." />
              <button className="btn btn-default" onClick={addItem}>+ Add Item</button>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <label>Default Invoice Template</label>
             <select
  className="form-control"
  value={defaultInvoice}
  onChange={(e) => setDefaultInvoice(e.target.value)}
>
  <option value="">-- Select Invoice Template --</option>

  {invoiceTemplates.map((item) => (
    <option key={item._id} value={item._id}>
      {item.templateName}
    </option>
  ))}
</select>
            </div>
            <div className="col-md-6">
              <label>Default Service Report Template</label>
              <select
  className="form-control"
  value={defaultReport}
  onChange={(e) => setDefaultReport(e.target.value)}
>
  <option value="">-- Select Service Report Template --</option>

  {serviceReportTemplates.map((item) => (
    <option key={item._id} value={item._id}>
      {item.templateName}
    </option>
  ))}
</select>
            </div>
          </div>
        </div>

        <div style={{textAlign:"right", padding:"15px", borderTop:"1px solid #eee"}}>
          <button className="btn btn-default" onClick={onClose}>Cancel</button>{" "}
          <button className="btn btn-success" onClick={handleSaveJob}>Save</button>
        </div>
      </div>
      </div>
    </div>
    </div>
    </div> 
    </div> 
  );
};

// ====================== MAIN PAGE (DONO SECTION EK SATH) ======================
export default function Page() {
  const [activeTab, setActiveTab] = useState("all");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [jobTemplates, setJobTemplates] = useState<any[]>([]);

const invoiceTemplates = templates.filter(
  (item) => Number(item.templateType) === 1
);

const reportTemplates = templates.filter(
  (item) => Number(item.templateType) === 2
);

const filtered =
  activeTab === "all"
    ? templates
    : activeTab === "invoices"
    ? invoiceTemplates
    : reportTemplates;


      const getTemplates = async () => {
  try {
    const res = await api.get("/v1/templateList");
    setTemplates(res.data.data || []);
  } catch (error) {
    console.log(error);
  }
};

const getJobTemplates = async () => {
  try {
    const res = await api.get("/v1/jobtemplateList");

    setJobTemplates(res.data.data || []);
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
  getTemplates();
   getJobTemplates();
}, []);


  // const filtered = activeTab === "all" ? templatesData : 
  //                 activeTab === "invoices" ? templatesData.filter(t => t.type === "Invoice") : 
  //                 templatesData.filter(t => t.type === "Service Report");

  return (
    <section className="content">
      {/* ==================== INVOICE SECTION ==================== */}
      <div className="box">
        <div className="box-header with-border">
          <h3 className="box-title">Invoice & Service Report Templates</h3>
          <p>Customize your invoices and service reports and assign defaults to service locations</p>
          <div className="box-tools pull-right">
            <button className="btn btn-primary" onClick={() => setShowInvoiceModal(true)}>
              <i className="fa fa-plus" /> New Template
            </button>
          </div>
        </div>

        <div className="box-body">
          {/* TABS */}
          <div style={{marginBottom:"20px"}}>
            <button className={`btn ${activeTab==="all"?"btn-primary":"btn-default"}`} onClick={()=>setActiveTab("all")} style={{marginRight:"5px"}}>All Templates ({templates.length})</button>
            <button className={`btn ${activeTab==="invoices"?"btn-primary":"btn-default"}`} onClick={()=>setActiveTab("invoices")} style={{marginRight:"5px"}}>Invoices ({invoiceTemplates.length})</button>
            <button className={`btn ${activeTab==="reports"?"btn-primary":"btn-default"}`} onClick={()=>setActiveTab("reports")}>Service Reports ({reportTemplates.length})</button>
          </div>

          {/* CARDS */}
          <div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
           {filtered.map((t) => (
  <div
    key={t._id}
    style={{
      width: "320px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: "16px",
      background: "#fff",
    }}
  >
    <strong>{t.templateName}</strong>

    <br />

    <small>
      Type : {t.templateType === 1 ? "Invoice" : "Service Report"}
    </small>

    <br />

    <small>{t.companyName}</small>

    <br />

    <small>Status : {t.status}</small>
  </div>
))}
          </div>
        </div>
      </div>

      {/* ==================== JOB SECTION ==================== */}
      <div className="box" style={{marginTop:"30px"}}>
        <div className="box-header with-border">
          <h3 className="box-title">Job Templates</h3>
          <p>Create reusable job presets with title, description, checklist, and default templates</p>
          <div className="box-tools pull-right">
            <button className="btn btn-success" onClick={() => setShowJobModal(true)}>
              <i className="fa fa-plus" /> New Job Template
            </button>
          </div>
        </div>
        <div className="box-body"> 
         <div className="row">
  {jobTemplates.map((item) => (
    <div className="col-md-4" key={item._id}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "15px",
          background: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h4>{item.jobTitle}</h4>

        <p>
          <strong>Template:</strong> {item.templateName}
        </p>

        <p>
          <strong>Description:</strong>
          <br />
          {item.jobDescription || "N/A"}
        </p>

        <p>
          <strong>Invoice Template:</strong>
          <br />
          {item.defaultInvoice?.templateName || "N/A"}
        </p>

        <p>
          <strong>Service Report:</strong>
          <br />
          {item.defaultReport?.templateName || "N/A"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`label ${
              item.status === "active"
                ? "label-success"
                : "label-danger"
            }`}
          >
            {item.status}
          </span>
        </p>

        {item?.checklist?.length > 0 && (
          <>
            <strong>Checklist:</strong>
            <ul style={{ paddingLeft: "18px" }}>
              {item.checklist.map((check:string, index:number) => (
                <li key={index}>{check}</li>
              ))}
            </ul>
          </>
        )}

        {/*<div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button className="btn btn-primary btn-sm">
            Edit
          </button>

          <button className="btn btn-danger btn-sm">
            Delete
          </button>
        </div>*/}
      </div>
    </div>
  ))}
</div>
        
        </div>
      </div>
      {/* ==================== JOB SECTION ==================== */}
      <div className="box">
          <JobType/> 
      </div>

      <div className="box">
         <NotificationTemplate/>
      </div>

      {/* MODALS */}
      <InvoiceCreateModal isOpen={showInvoiceModal} onClose={() => setShowInvoiceModal(false)} />
      <JobCreateModal isOpen={showJobModal} onClose={() => setShowJobModal(false)} />

      {/* GLOBAL MODAL STYLES */}
   <style jsx global>{`
     .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;

          overflow-y: scroll;  
        }

        .modal-dialog {
          width: auto;
          max-width: 1200px;
          margin: 20px auto;
          max-height: 92vh;         /* screen ke andar rahega */
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
    </section>
  );
}