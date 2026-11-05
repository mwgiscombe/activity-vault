'use client'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

function LogoutButton() {
    const router= useRouter()
    const handleLogout = async() =>{
        const supabase = createClient()
        await supabase.auth.signOut()
        
        router.refresh()
    }
  return (
    <div>
      <button
      className='btn btn-outline-danger'
      onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default LogoutButton
