
import { createClient } from "@/utils/supabase/server";
import { connection } from "next/server";
import Link from "next/link";

export default async function UserLibrary({userId}){

    const supabase = await createClient()

    const {data: library} = await supabase
    .from('user_library')
    .select('activity_id')
    .eq('user_id', userId)

    const activityIds = library.map(
        item=> item.activity_id
    )

    
    const {data: activity} = await supabase
    .from('activities')
    .select('*')
    .in('id', activityIds)

  
  
   
    return(
        <>
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
        </>
    )

   
   
    
}