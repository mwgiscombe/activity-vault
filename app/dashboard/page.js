import { Suspense } from "react";
import Nav from "@/components/Nav";
import { connection } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation"
import Image from "next/image";
import ActivityForm from "@/components/ActivityForm";

import UserLibrary from "@/components/UserLibrary";
import Link from "next/link";

   const profileLinks=[
        {title: 'Library',
       
        },
        {title: 'Actions',
            component: ''
        }
    ]
        const dashboardActions=[
            {title: 'Create Activity',
                id: 1,
            color: '#8B5CF6'
            },
            {title: 'Create Lesson',
                id: 2,
                color: '#22C55E'
            },
            {title: 'Create Printable',
                id: 3,
                color: '#F59E0B'
            },
            {title: 'Create Certificate',
                id: 4,
                color: '#EF4444'
            }
        ]

        

async function DashboardContent(){
    await connection()
  const supabase = await createClient()

     const {data: userData, error: userError} = await supabase.auth.getUser()
     if(userError || !userData?.user){
        redirect('/login')
     }
     const user = userData.user

     const {data: profile} = await supabase
     .from('profiles')
     .select('full_name, plan, credits, id')
     .eq('id', user.id)
     .maybeSingle()

   
     return(

    <>
    
    
    <section className='d-flex gap-4 h-100 mt-4'>
        
        <div className=' d-flex flex-row flex-wrap dashboardActionsWrapper flex-grow-1 gap-3'>
        <div className="bg-white border rounded-4 p-5 mb-4 shadow-sm">
  <div className="row align-items-center">
    <div className="col-lg-8">
      <span className="badge bg-primary-subtle text-primary mb-3">
        Activity Vault
      </span>

      <h1 className="display-5 fw-bold mb-3">
        Create engaging learning experiences in minutes.
      </h1>

      <p className="lead text-secondary mb-4">
        Generate activities, lesson plans, camps, and scavenger hunts. Save
        everything to your library and customize it for your learners.
      </p>
      <hr />

      <p className="lead text-secondary mb-4">
        What should we create today?
      </p>

      <div className="d-flex flex-wrap gap-2">
        <Link href="/activities/create" className="btn btn-primary btn-lg">
          🎲 Activity
        </Link>

        <Link href="/lesson-plans/create" className="btn btn-outline-primary btn-lg">
          📚 Lesson Plan
        </Link>

        <Link href="/camps/create" className="btn btn-outline-primary btn-lg">
          🏕️ Camp
        </Link>

        <Link href="/scavenger-hunts/create" className="btn btn-outline-primary btn-lg">
          🔍 Scavenger Hunt
        </Link>
      </div>
    </div>

    <div className="col-lg-4 mt-4 mt-lg-0">
      <div className="row g-3">
        <div className="col-6">
          <div className="card text-center border-0 bg-light">
            <div className="card-body">
              <h3 className="fw-bold mb-0">124</h3>
              <small className="text-muted">Activities</small>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card text-center border-0 bg-light">
            <div className="card-body">
              <h3 className="fw-bold mb-0">12</h3>
              <small className="text-muted">Lesson Plans</small>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card text-center border-0 bg-light">
            <div className="card-body">
              <h3 className="fw-bold mb-0">4</h3>
              <small className="text-muted">Camps</small>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card text-center border-0 bg-light">
            <div className="card-body">
              <h3 className="fw-bold mb-0">8</h3>
              <small className="text-muted">Scavenger Hunts</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
         

        </div>
           
    </section>
  
  </>
     )
}
export default async function Dashboard() {
    
     

  
    return (
        <Suspense fallback={<p>Loading…</p>}>
        <DashboardContent />
      </Suspense>
    );
  }