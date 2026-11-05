
"use client"
import { createClient } from "@/utils/supabase/client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'

function page() {
    const supabase = createClient()
    const router = useRouter()
   const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'educator'
   })

   const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    router.push('/dashboard')
  };

const handleSignup = async (e) =>{
    e.preventDefault()

    const {data, error}= await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options:{
            data:{
                full_name: form.name,
                role: form.role
            } 
        }
    })

    if(error){
        alert(error.message)
        return
    }

    router.push('/signup/confirm')
}
  return (
    <>
    <Nav />
    <section className='bg-light py-5'>
        <div className='container py-5'>
            <div className='row align-items-center'>
             <form onSubmit={handleSignup} className='py-5 rounded shadow-sm border'>
                <h2>Sign up for Activity Vault</h2>
                     <div className="mb-3 d-flex flex-column gap-2">
                        <input className="form-control" placeholder='Full Name'
                             onChange={(e)=>
                               setForm({...form, name: e.target.value})
                             } />
                        <input type="email"          className="form-control"                                placeholder='Email'
                            onChange={(e)=>
                                setForm({...form, email: e.target.value})
                            } />

                        <input type="password"      className="form-control"aria-describedby="emailHelp"        placeholder='Password'
                                onChange={(e)=>
                            setForm({...form, password: e.target.value})
                             } />
                             <select className="form-select" aria-label="Default select example" onChange={(e)=>
                               
                                setForm({...form, role: e.target.value})
                             }>
                                 <option defaultValue>Choose Role</option>
                                 <option value="educator">Educator</option>
                                 <option value="coordinator">Coordinator</option>
                                 <option value="organization">Organization</option>
                             </select>

                     </div>
                   
                        <button type="submit" className="btn btn-primary">Submit</button>

                        <button
        className="btn btn-primary"
        onClick={signInWithGoogle}
      >
        Sign Up with Google
      </button>
            </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default page
