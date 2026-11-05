"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ActivityForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activity, setActivity] = useState(null);
  

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
    const res = await fetch("/api/generate-activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    const json = await res.json();

    if (!res.ok) {setError(json.error || "Something went wrong.");}else{
    const generatedActivity= json.activity
    setActivity(generatedActivity);
    const {data: savedActivity, error: insertError} = await supabase
    
    .from("activities")
    .insert({
      title: generatedActivity.title,
      summary: generatedActivity.summary,
      age_range: generatedActivity.ageRange,
      duration_minutes: generatedActivity.durationMinutes,
      learning_goals: generatedActivity.learningGoals,
      materials: generatedActivity.materials,
      instructions: generatedActivity.instructions,
      owner_id: user.id
    })
    .select()
    .single()
   
    if (insertError) {
        console.error(insertError);
        setError(insertError.message);
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
    setLoading(false);}
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <input name="theme" placeholder="Theme (e.g. recycled robots)" required />
        <input name="ageGroup" placeholder="Age group (e.g. 7-9)" required />
        <input name="groupSize" type="number" placeholder="Group size" />
        <input name="duration" type="number" placeholder="Minutes" />
        <textarea name="materialsOnHand" placeholder="Materials you already have" />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Creating your activity..." : "Generate activity"}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}

      {activity && (
        <article className="printable">
          <h2>{activity.title}</h2>
          <p>{activity.summary}</p>

          <h3>Materials</h3>
          <ul>{activity.materials.map((m, i) => <li key={i}>{m}</li>)}</ul>

          <h3>Steps</h3>
          <ol>
            {activity.instructions.map((s) => (
              <li key={s.step}><strong>{s.title}.</strong> {s.details}</li>
            ))}
          </ol>

          <h3>Printables</h3>
          {activity.printables.map((p, i) => (
            <section key={i} className="printable-sheet">
              <h4>{p.name}</h4>
              <pre style={{ whiteSpace: "pre-wrap" }}>{p.content}</pre>
            </section>
          ))}

          <button onClick={() => window.print()}>Print</button>
        </article>
      )}
    </>
  );
}