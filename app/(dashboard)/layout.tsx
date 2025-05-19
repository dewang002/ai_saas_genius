import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar"
import { getApiCount } from "@/lib/api-limit"
import { checkSubscripton } from "@/lib/subscription"


const DashBoardLayout = async({ children }: {
    children: React.ReactNode
}) => {
    const count = await getApiCount()
    const isPro = await checkSubscripton()
    return (
        <div className="relative h-full">
            <div className="hidden md:flex">
                <SideBar isPro={isPro} count={count} />
            </div>
            <main className="md:pl-72">
                <NavBar />
                {children}
            </main>
        </div>
    )
}

export default DashBoardLayout