import { auth } from "@/auth"
import NewService from "../components/NewService"
import { redirect } from "next/navigation";

export default async function NewServisePage() {
  const session = await auth()
  if (!session) redirect('/auth')
 

  return (
   <NewService />
  );
}
