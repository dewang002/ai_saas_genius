import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./MobileSidebar"
import FreeCounter from "./FreeCounter"
import { getApiCount } from "@/lib/api-limit"
import { checkSubscripton } from "@/lib/subscription"

const NavBar = async() => {
  const count = await getApiCount()
  const isPro = await checkSubscripton()
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} count={count} />
      <div className="flex justify-end w-full">
        <UserButton />
      </div>
    </div>
  )
}

export default NavBar