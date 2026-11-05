import Nav from "@/components/Nav";
import { login } from "./actions";

export default async function LoginPage({ searchParams }) {


  return (
    <>
    <Nav />
    <section className='py-5'>
    <form action={login}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" required />

  
      <button type="submit">Log in</button>
    </form>
    </section>
    </>
  );
}