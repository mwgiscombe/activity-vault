'use server'


import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function deleteActivity(id) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('user_library')
    .delete()
    .eq('activity_id', id)
    .select()

    console.log('deleted:', data, 'error:', error )

  if (error) {
    console.log(error)
    return { error: error.message }
  }

redirect('/dashboard/library')
}


