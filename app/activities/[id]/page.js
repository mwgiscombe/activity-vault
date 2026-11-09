import Nav from "@/components/Nav";
import { createClient } from "@/utils/supabase/server";
import { connection } from "next/server";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import DeleteActivityButton from "@/components/DeleteActivityButton";



export default function ActivityPage({params}) {
 return (
  <>
 <Nav />
  <Suspense fallback={<p className='text-muted p-3'>Loading....</p>}>
 
    <ActivityDetails params={params} />
  
  </Suspense>
  </>
 )

}

 async function ActivityDetails({params}){
  
  await connection()
  const { id } = await params
  const supabase = await createClient()

  const {data: activity} = await supabase 
           .from('activities')
          .select('*')
           .eq('id', id)
        .single()
  
        if(!activity) notFound()

   
    
      return (
        <>
      
        <div className="card shadow-sm h-100 m-5">
          <div className="card-header bg-primary text-white d-flex flex-row justify-content-between">
            <span className="badge bg-light text-dark me-2 d-flex align-items-center">
              {activity.age_range} 
            </span>
            <h5 className="card-title">{activity.title}!</h5>
            {activity.category}
          </div>
    
          <div className="card-body">
            
    
            <div className="mb-3">
              <small className="text-muted d-block">
                <strong>Duration:</strong> {activity.duration_minutes} mins
              </small>
    
              <small className="text-muted d-block">
                <strong>Group Size:</strong> {activity.group_size}
              </small>
    
              <small className="text-muted d-block">
                <strong>Materials:</strong> 
                <ul>{activity.materials.map((material, i)=>(
                  <li key={i}>{material}</li>
                ))}</ul>
              </small>
            </div>
    
            <div className="d-flex flex-wrap gap-1">
              TAGS
            </div>
          </div>
    
          <div className="card-footer bg-white">
            <div className="d-flex justify-content-end">
            
              <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    ...
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">👥 Share</a></li>
    <li><a className="dropdown-item" href="#">🖨️ Print</a></li>
    <hr />
    <li><DeleteActivityButton id={id} /></li>
  </ul>
</div>
            </div>
          </div>
        </div>
        </>
      );
    }
