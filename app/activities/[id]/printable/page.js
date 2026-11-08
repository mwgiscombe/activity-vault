import Nav from "@/components/Nav";
import { createClient } from "@/utils/supabase/server";

export default async function Printable({params}){
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