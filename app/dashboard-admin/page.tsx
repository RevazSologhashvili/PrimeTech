import { redirect } from "next/navigation";
import ShowList from "./components/ShowList"
import { auth } from "@/auth"

export default async function DashboardPage() {
  
  const session = await auth()
  if (!session) redirect('/auth')

  return (
   <ShowList />
  );
}
