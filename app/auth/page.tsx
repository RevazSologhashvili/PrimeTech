import { auth, signIn } from "@/auth";
import React from "react";

export default async function page() {
    const sessionAuth = await auth();
    
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        action={async () => {
          "use server";
          const dt = await signIn("google");

          if (dt) {
            alert("goood")
          } else {
            alert("!!!!!!")
          }
        }}
      >
        <button type="submit" className="px-5 py-3 rounded-xl shadow-xl bg-purple-500">შესვლა Google</button>
      </form>
    </div>
  );
}
