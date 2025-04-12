import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs"

const NavBar = () => {
  return (
    <div className="flex items-center p-4">
        <Button className="md:hidden" variant={'ghost'}>
            <Menu />
        </Button>
        <div className="flex justify-end w-full">
            <UserButton />
        </div>
    </div>
  )
}

export default NavBar