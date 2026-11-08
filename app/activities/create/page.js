import ActivityForm from '@/components/ActivityForm'
import Nav from '@/components/Nav'
import React from 'react'

function CreateActivity() {
  return (
    <>
    <Nav />
    <section className='d-flex gap-4 h-100 w-75 mt-4 mx-auto'>
         <div className=' d-flex flex-row flex-wrap dashboardActionsWrapper flex-grow-1 gap-3'>
         <div className="bg-white border rounded-4 p-5 mb-4 shadow-sm w-100">
  <div className="row align-items-center">
    <div className="col-lg-8">
         <ActivityForm />
</div>
</div>
</div>
         </div>
    
      </section>
      </>
  )
}

export default CreateActivity
