import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./MobileSidebar"
import FreeCounter from "./FreeCounter"
import { getApiCount } from "@/lib/api-limit"

const NavBar = async() => {
  const count = await getApiCount()
  return (
    <div className="flex items-center p-4">
      <MobileSidebar count={count} />
      <div className="flex justify-end w-full">
        <UserButton />
      </div>
    </div>
  )
}

export default NavBar