"use client"


import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import SideBar from "@/components/SideBar"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

const MobileSidebar = ({count, isPro}:{count:number, isPro:boolean}) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="md:hidden" size='icon' variant='ghost'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SideBar isPro={isPro} count={count} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar