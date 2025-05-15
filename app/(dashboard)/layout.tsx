import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar"
import { getApiCount } from "@/lib/api-limit"


const DashBoardLayout = async({ children }: {
    children: React.ReactNode
}) => {
    const count = await getApiCount()
    return (
        <div className="relative h-full">
            <div className="hidden md:flex">
                <SideBar count={count} />
            </div>
            <main className="md:pl-72">
                <NavBar />
                {children}
            </main>
        </div>
    )
}

export default DashBoardLayout