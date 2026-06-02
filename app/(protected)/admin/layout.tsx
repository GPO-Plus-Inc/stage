"use client";

import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminUi from "./AdminUi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = useUser();
  const router = useRouter();

  useEffect(() => {

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "Admin") {
      router.replace("/dashboard");
    }

  }, [user, router]);

  if (!user || user.role !== "Admin") {
    return null;
  }

  return <AdminUi user={user}>{children}</AdminUi>;
}
