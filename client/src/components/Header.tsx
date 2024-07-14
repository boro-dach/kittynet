"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" h-16 m-4 bg-zinc-900 rounded-xl flex justify-between items-center">
        <Link href='/'><h1 className=" ml-8 font-bold text-2xl ">kittynet</h1></Link>
        <button onClick={() => signIn()} className=" mr-8 px-4 py-2 bg-zinc-50 text-black rounded-xl hover:brightness-50 transition-all duration-200">войти</button>
    </header>
  ) 
}