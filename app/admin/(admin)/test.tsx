'use client'
import { useSession } from "next-auth/react"
import { logout } from "@/actions"

export const Test = () => {

     const { data: session } = useSession({
        required: true
    })

    const onLogout = async () => {
        console.log("logout")
        await logout()
        window.location.reload()
    }


  return (
   <span className="text-green-700 text-sm md:text-base cursor-pointer" onClick={()=> onLogout()}>{session?.user?.email}</span>
  )
}
