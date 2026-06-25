"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  user: any;
  children: React.ReactNode;
};

export default function AdminUI({ user, children }: Props) {

  const pathname = usePathname();

  const formatPage = (str: string) => {
    return str
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const page = formatPage(pathname.split("/").pop() || "");

  return (
    <div className="content-wrapper">
        {/* Content Header (Page header) */}
    <section className="content-header">
       <ul className="list-inline">
       <li>
          <Link href="/admin/organization" className="btn bg-purple btn-flat">
            Organization
          </Link>
        </li>
       <li>
          <Link href="/admin/users" className="btn bg-purple btn-flat">
            Users
          </Link>
        </li>
       <li>
          <Link href="/admin/qbo" className="btn bg-purple btn-flat">
            QBO
          </Link>
        </li>
       <li>
          <Link href="/admin/zoho" className="btn bg-purple btn-flat">
            Zoho CRM
          </Link>
        </li>
       <li>
          <Link href="/admin/templates" className="btn bg-purple btn-flat">
            Templates
          </Link>
        </li>
       <li>
          <Link href="/admin/price-list" className="btn bg-purple btn-flat">
            Price List
          </Link>
        </li>
       <li>
          <Link href="/admin/service-location-fields" className="btn bg-purple btn-flat">
            Custom fields
          </Link>
        </li>
       <li>
          <Link href="/admin/integrations" className="btn bg-purple btn-flat">
            Integrations
          </Link>
        </li>
       <li>
          <a href="/admin/permissions" className="btn bg-green btn-flat">
            Role & Permissions
          </a>
        </li>
       <li>
          <a href="#" className="btn btn-warning btn-flat">
            Instruction (PDF)
          </a>
        </li>
       </ul>

    </section>
     
          {/* Breadcrumb */}
      <section className="content-header">
        <h1>{page}</h1>

        <ol className="breadcrumb">
          <li>
            <Link href="/admin">
              <i className="fa fa-dashboard"></i> Admin
            </Link>
          </li>

          <li className="active">{page}</li>
        </ol>
      </section>

      {children}

    </div>
  );
}
