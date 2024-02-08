"use client"

import { FcGoogle,  } from "react-icons/fc"
import { FaFacebook, FaApple } from "react-icons/fa";


import { Button } from "@/components/ui/button"
import { loginProvider } from "@/actions/loginProviders";
export const Social = () => {

  return (
    <div className="flex items-center w-full gap-x-2">
        <Button size="lg"
        className="w-full"
        variant="outline"
        onClick={()=>loginProvider("google")}
        >
            <FcGoogle className="h-5 w-5"/>
        </Button>
        <Button size="lg"
        className="w-full"
        variant="outline"
        onClick={()=>loginProvider("facebook")}
        >
            <FaFacebook  className="h-5 text-sky-700 w-5"/>
        </Button>
    </div>
  )
}

