import { Suspense } from "react";
import Nav from "@/components/Nav";
import { connection } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation"
import Image from "next/image";
import ActivityForm from "@/components/ActivityForm";
import coin from '@/public/images/coin.png'
import UserLibrary from "@/components/UserLibrary";


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

        const profileLinks=[
            {title: 'Library',
            component: ''
            },
            {title: 'Actions',
                component: ''
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
    <Nav />
    <UserLibrary userId={user.id} />
    <section className='d-flex gap-4 h-100'>
        <div className=' border flex-grow-0 px-4 bg-dark text-light profileSide h-100'>
            {profile ? 
                  <>
                  <h1>Hi there, {profile.full_name}</h1>
                  <p>{profile.email}</p>
                  <p>Current Plan: {profile.plan}</p>
                 <div className='badge bg-danger px-4 py-2 align-items-center           justify-content-center gap-2 w-25 d-flex flex-row'><Image alt='coin'        src={coin} width='25' /> <p className='p-0 m-0'>{profile.credits}</p></ div>
                 <hr />
                 <div className='profileLinksWrapper d-flex flex-column gap-2'>
                    {profileLinks.map((link, i)=>(
                        <p className='profileLink' key={i}>{link.title}</p>
                    ))}
                 </div>
                        
                        
                  </>  : ''  
        }
        </div>
        <div className=' d-flex flex-row flex-wrap dashboardActionsWrapper flex-grow-1 gap-3'>
            {dashboardActions.map((action)=>(
                <div key={action.id}
                className='d-flex flex-column shadow p-2 rounded'
                style={{
                    borderTop: `10px solid ${action.color}`
                }}>
                    <h3>{action.title}</h3>
                </div>
            ))}

        </div>
            <ActivityForm />
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