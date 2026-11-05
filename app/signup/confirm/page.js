import Nav from "@/components/Nav";

export default function ConfirmPage(){
    return(
        <>
        <Nav />
        <section className='bg-light py-5'>
        <div className='container py-5 '>
            <div className='row d-flex align-items-center justify-content-center'>
                <div className='w-50 rounded shadow-sm py-5 text-center'>
                    <h4> 
                        Check your inbox! We've sent a verification email to your address. Click the link to activate your Activity Vault account.
                    </h4>
                </div>
            </div>
            </div>
            </section>
            </>
    )
}