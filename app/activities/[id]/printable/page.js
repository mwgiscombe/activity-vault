import Nav from "@/components/Nav";
import { createClient } from "@/utils/supabase/server";
import { connection } from "next/server";
import { Suspense } from "react";
import { notFound } from "next/navigation";

export default  function Printable({params}){

    return(
        <>
        <Nav />
        <Suspense fallback={<p className='text-muted p-3'>Loading....</p>}>
        <PrintableContent params={params} />
        </Suspense>
      </>
        
    )
    }

async function PrintableContent({params}){
    const {id} = await params
    const supabase = await createClient()

    const {data:activity} = await supabase
        .from ('activities')
        .select('printables')
        .eq('id', id)
        .single()

        return(
            <>
            <Nav />
                <section className='card shadow-sm h-100 w-80 p-5'>
                 
                   {activity.printables.map((print)=>(
                    <div className="border p-5">
                        <div className='badge'>{print.description}</div>
                    <h2>{print.name}</h2>
                    <div style={{whiteSpace: 'pre-wrap', lineHeight: '2em'}}>{print.content}</div>
                    </div>
                   ))}
                </section>



            </>
        )

}