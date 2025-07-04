'use client'

import { login } from "@/lib/actions/auth"

const SignUpIn = () => {
  return (
    <div className="cursor-pointer">
        <button onClick={() => login()} className="inline-flex h-12 items-center justify-center rounded-md bg-[#5865F2] px-6 font-medium text-neutral-50 transition active:scale-110 ">
            <img src="/discord.svg" alt="Discord logo" className="w-8 h-8" />
            <p className="ml-3">Sign in with Discord</p>
        </button>
    </div>
  )
}

export default SignUpIn
