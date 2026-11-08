// app/dashboard/layout.js
import { connection } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation"
import Nav from "@/components/Nav";
import Link from "next/link";
import coin from '@/public/images/coin.png'
import Image from "next/image";

export default async function DashboardLayout({ children }) {
    
    const supabase = await createClient()
  
       const {data: userData, error: userError} = await supabase.auth.getUser()
       if(userError || !userData?.user){
          redirect('/login')
       }
       const user = userData.user
  
    //    const {data: profile} = await supabase
    //    .from('profiles')
    //    .select('full_name, plan, credits, id')
    //    .eq('id', user.id)
    //    .maybeSingle()
  return (
    <>
      {/* <Nav /> */}

      <section className="d-flex gap-4 ">
        <div className="profileSide bg-dark text-light p-4 d-flex flex-column justify-content-between align-items-between">
            <div>
            {/* <h1>Hi there, {profile.full_name}</h1> */}
            {/* <p>Current Plan: {profile.plan}</p> */}
            {/* <div className='badge p-2 px-3'><Image className='me-2' src={coin} width='25' />{profile.credits}</div> */}
            <hr />
          <Link href="/dashboard">
            <p>Dashboard, yes</p>
          </Link>

          <Link href="/dashboard/library">
            <p>Library</p>
          </Link>

          <Link href="/dashboard/settings"> 
            <p>Settings</p>
          </Link>
          </div>

          <div className="d-flex flex-wrap flex-column gap-2">
        <Link href="/activities/create" className="btn btn-outline-primary btn text-start">
        <div className='rounded badge bg-white p-2 me-2'> ➕</div>Activity
        </Link>

        <Link href="/lesson-plans/create" className="btn btn-outline-primary btn text-start">
        <div className='rounded badge bg-white p-2 me-2'> ➕</div>
          Lesson Plan
        </Link>

        <Link href="/camps/create" className="btn btn-outline-primary btn text-start">
        <div className='rounded badge bg-white p-2 me-2'> ➕</div>
          Camp
        </Link>

        <Link href="/scavenger-hunts/create" className="btn btn-outline-primary btn text-start">
        <div className='rounded badge bg-white p-2 me-2'> ➕</div>
          Scavenger Hunt
        </Link>
      </div>

        </div>

        <div className="flex-grow-1">
          {children}
        </div>

      </section>
    </>
  );
}