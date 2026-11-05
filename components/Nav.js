'use client'
import Link from "next/link"
import Image from "next/image"
import logo from '../public/images/logoSm.png'
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

function Nav() {
  const router= useRouter()
   const [user, setUser] = useState(null)
  
   useEffect(()=>{
     
  const supabase = createClient()

  supabase.auth.getUser().then(({data: {user}})=>setUser(user))

  const {data:{subscription}} = supabase.auth.onAuthStateChange((_event,session)=>{
    setUser(session?.user ?? null)

  })
  return () => subscription.unsubscribe()
  
   },[])
   console.log('user', user)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <Image
      src={logo} 
      alt='logo'
      width='100' /></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Pricing</a>
          </li>
        </ul>
        <span className="navbar-text">
          {user ? 
          <>
          
            <p>Welcome Back, {user.user_metadata.full_name}!</p>
            <LogoutButton />
            </>:
           <>
           <button className="btn btn-light" onClick={()=>router.push('/login')}>Login</button>
           <button type="button" className="btn btn-info" onClick={()=>router.push('/signup')}>SignUp</button>
           </>
          }
        </span>
      </div>
    </div>
  </nav>
  )
}

export default Nav
