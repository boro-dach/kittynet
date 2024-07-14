"use client"

import { signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className=" h-16 m-4 bg-zinc-900 rounded-xl flex justify-between items-center">
        <Link href='/'><h1 className=" ml-8 font-bold text-2xl ">kittynet</h1></Link>
        {session ? (
          <button onClick={() => signOut()} className=" mr-8 px-4 py-2 bg-zinc-50 text-black rounded-xl hover:brightness-50 transition-all duration-200">выйти(</button>
        ) : (
          <button onClick={() => signIn()} className=" mr-8 px-4 py-2 bg-zinc-50 text-black rounded-xl hover:brightness-50 transition-all duration-200">войти</button>
        )}
    </header>
  ) 
}