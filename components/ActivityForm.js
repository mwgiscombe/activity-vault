"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ActivityForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activity, setActivity] = useState(null);
  const router = useRouter()
  

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('submit fired')
    const supabase = createClient()
    const {
        data: {user},

    } = await supabase.auth.getUser()
  
    setLoading(true);
    setError("");
    setActivity(null);

    const form = new FormData(e.target);
    console.log(Object.fromEntries(form));
    const res = await fetch("/api/generate-activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    const json = await res.json();

    if (!res.ok) {
        setError(json.error || "Something went wrong.");
        setLoading(false)
    }else{
    const generatedActivity= json.activity
    setActivity(generatedActivity);
    const {data: savedActivity, error: insertError} = await supabase
    
    .from("activities")
    .insert({
      title: generatedActivity.title,
      summary: generatedActivity.summary,
      age_range: generatedActivity.ageRange,
      group_size: generatedActivity.groupSize,
      duration_minutes: generatedActivity.durationMinutes,
      learning_goals: generatedActivity.learningGoals,
      materials: generatedActivity.materials,
      instructions: generatedActivity.instructions,
      prep_steps: generatedActivity.prep_steps,
      category: generatedActivity.theme,
      facilitator_tips: generatedActivity.facilitator_tips,
      printables: generatedActivity.printables,

      owner_id: user.id
    })
    .select()
    .single()
   
    if (insertError) {
        console.error(insertError);
        setError(insertError.message);
        setLoading(false)
      }

      const {error: libraryError} = await supabase
     
      .from('user_library')
      .insert({
          user_id: user.id,
          activity_id: savedActivity.id
      })
      if (libraryError) {
        console.error(libraryError);
        setError(libraryError.message);
      }
    setLoading(false);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <h3>Create an Activity</h3>
        <div className="mb-3">
            <label htmlFor="theme" className="form-label">Theme</label>
            <input type="text" className="form-control" name='theme' aria-describedby="emailHelp" />
    
        </div>
        <div className="mb-3">
            <label htmlFor="groupSize" className="form-label">Group Size</label>
            <input type="text" className="form-control" name='groupSize' aria-describedby="groupSize" />
    
        </div>
        <div className="mb-3">
            <label htmlFor="ageRange" className="form-label" placeholder='(e.g. 7-9)'>Age Range</label>
            <input type="text" className="form-control" name='ageGroup' aria-describedby="groupSize" />
    
        </div>
        <div className="mb-3">
            <label htmlFor="time" className="form-label" >Duration (in minutes) </label>
            <input type="number" className="form-control" name='duration' aria-describedby="groupSize" />
    
        </div>
        <div className="mb-3">
            <label htmlFor="materialsOnHand" className="form-label" >Materials you already have </label>
            <textarea
              className="form-control"
              rows="3"
              name='materialsOnHand'

            />
            
    
        </div>
        <div className="mb-3">
            <label htmlFor="learningGoals" className="form-label" >Learning Goals</label>
            <textarea
              className="form-control"
              rows="3"
              name='learningGoals'

            />
            
    
        </div>
  
  <button type="submit" className="btn btn-primary" disabled={loading}>
  {loading ? "Creating your activity..." : "Generate activity"}
  </button>
</form>
     

      {error && <p role="alert">{error}</p>}

    </>
  );
}