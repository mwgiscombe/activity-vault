
import { createClient } from "@/utils/supabase/server";
import { connection } from "next/server";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function UserLibrary(){

    return(

    <>
   <Suspense fallback={<p className='text-muted p-3'>Loading...</p>}>
    <UserLibraryContent />
    </Suspense>
    </>
    )
}

async function UserLibraryContent(){
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


    const {data: library, error} = await supabase
    .from('user_library')
    .select('activity_id')
    .eq('user_id', user.id)
    console.log("library", library)
    console.log("error", error)
    const activityIds = library.map(
        item=> item.activity_id
    )

    
    const {data: activity} = await supabase
    .from('activities')
    .select('*')
    .in('id', activityIds)

  
  
   
    return(
        <>
        <h1>Standalone Activities</h1>
       <div className="d-flex flex-row flex-wrap gap-2">
       {activity?.map(item=>(
        <div key={item.id} className='d-flex flex-column shadow rounded p-5 w-25'>
            <div className='d-flex flex-row justify-content-between'>
                <div className='badge bg-light text-dark'>{item.age_range}</div>
                <div className='badge bg-light text-dark'>{item.duration_minutes} mins</div>
                
            </div>
           <h4>{item.title}</h4> 
           <p>{item.summary}</p> 
           <Link href={`/activities/${item.id}`} className="btn btn-outline-primary btn-sm">View</Link>
           
        </div>
       
       ))}
        </div>
        <h1>Lessons</h1>
        </>
    )

   
   
    
}