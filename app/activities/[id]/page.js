import Nav from "@/components/Nav";
import { createClient } from "@/utils/supabase/server";


export default async function ActivityDetails({params}) {
  const { id } = await params
  const supabase = await createClient()

  const {data: activity} = await supabase
          .from('activities')
          .select('*')
          .eq('id', id)
          .single()

    return (
      <>
      <Nav />
      <div className="card shadow-sm h-100">
        <div className="card-header bg-primary text-white">
          <span className="badge bg-light text-dark me-2">
           {/* {activity.age_range} */}
          </span>
          {activity.category}
        </div>
  
        <div className="card-body">
          <h5 className="card-title">{activity.title}</h5>
  
          <p className="card-text text-muted">
            
          </p>
  
          <div className="mb-3">
            <small className="text-muted d-block">
              <strong>Duration:</strong> {activity.duration_minutes} mins
            </small>
  
            <small className="text-muted d-block">
              <strong>Group Size:</strong> SIZE
            </small>
  
            <small className="text-muted d-block">
              <strong>Materials:</strong> {activity.materials.map((material, i)=>(
                <li key={i}>{material}</li>
              ))}
            </small>
          </div>
  
          <div className="d-flex flex-wrap gap-1">
            TAGS
          </div>
        </div>
  
        <div className="card-footer bg-white">
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-primary btn-sm">
              Print
            </button>
  
            <button className="btn btn-outline-success btn-sm">
              Save
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }