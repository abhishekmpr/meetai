"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";


export default function Home() {
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  const { 
        data: session} = authClient.useSession() 


  

  const onSubmit = () => {
    authClient.signUp.email(
      { email, name, password },
      {
        onError: () => window.alert("Something went wrong"),
        onSuccess: () => window.alert("success"),
      }
    );
  }
  if(session){
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in {session?.user.name}</p>
        <Button onClick={()=> authClient.signOut()}>SignOut</Button>

      </div>
    )
  }

  

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input 
      placeholder="name" 
      value={name}
       onChange={(e) => setName(e.target.value)} 
       />
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
}
