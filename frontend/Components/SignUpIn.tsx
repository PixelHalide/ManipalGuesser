'use client'

import { login } from "@/lib/actions/auth"
import Image from "next/image"

const SignUpIn = () => {
  return (
    <div className="cursor-pointer">
        <button onClick={() => login()} className="inline-flex h-12 items-center justify-center rounded-md bg-[#5865F2] px-6 font-medium text-neutral-50 transition active:scale-110 ">
            <Image width={32} height={32} src="/discord.svg" alt="Discord logo"/>
            <p className="ml-3">Sign in with Discord</p>
        </button>
    </div>
  )
}

export default SignUpIn
