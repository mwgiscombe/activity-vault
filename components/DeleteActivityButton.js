'use client'

import { deleteActivity } from "@/app/activities/[id]/actions"

export default function DeleteActivityButton({id}){
    async function handleDelete(e){
        if (confirm('Remove this activity from your library? This action cannot be undone')){
            await deleteActivity(id)
        }

    }

    return(
        <button className='dropdown-item' onClick={handleDelete}>
            🗑️ Delete
        </button>
    )

}