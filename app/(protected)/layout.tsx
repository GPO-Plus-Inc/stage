import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";
import UserProvider from "@/context/userProvider";
import Header from "@/component/header";
import Aside from "@/component/aside";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <UserProvider user={user}>
      <div className="wrapper">
        <Header />
        <Aside />
        <main>{children}</main>
      </div>
    </UserProvider>
  );
}




// import { redirect } from "next/navigation";
// // import { getCurrentUser } from "@/lib/getCurrentUser";
// import UserProvider from "@/context/userProvider";
// import Header from "@/component/header";
// import Aside from "@/component/aside";

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // const user = await getCurrentUser(); 
//   const user = true; 
//   // ❌ No session
//   if (!user) redirect("/login");
 
//   return <UserProvider user={user}>
// <div className="wrapper">
//    <Header/>
//    <Aside/>
//    <main>
//   {children}
//   </main>
//   </div>
//   </UserProvider>;
  
// }
