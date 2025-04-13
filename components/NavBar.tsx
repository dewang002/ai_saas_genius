import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./MobileSidebar"

const NavBar = () => {
  return (
    <div className="flex items-center p-4">
        <MobileSidebar />
        <div className="flex justify-end w-full">
            <UserButton />
        </div>
    </div>
  )
}

export default NavBar