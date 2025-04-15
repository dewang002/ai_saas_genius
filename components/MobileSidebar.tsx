"use client"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import SideBar from "@/components/SideBar"
import { Button } from "./ui/button"

const MobileSidebar = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <Button className="md:hidden">
            <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 h-full overflow-hidden">
            <SideBar />
        </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar