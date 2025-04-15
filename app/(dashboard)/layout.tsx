import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar"

const DashBoardLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="relative h-full">
            <div className="hidden md:flex">
                <SideBar />
            </div>
            <main className="md:pl-72">
                <NavBar />
                {children}
            </main>
        </div>
    )
}

export default DashBoardLayout