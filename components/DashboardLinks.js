import React from 'react'
import UserLibrary from "@/components/UserLibrary";
function DashboardLinks({userId}) {

    const profileLinks=[
        {title: 'Library',
        component: <UserLibrary userId={userId} />
        },
        {title: 'Actions',
            component: ''
        }
    ]
  return (
    <div className='profileLinksWrapper d-flex flex-column gap-2'>
    {profileLinks.map((link, i)=>(
        <p className='profileLink' key={i}>{link.title}</p>
    ))}
 </div>
  )
}

export default DashboardLinks
