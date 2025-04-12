import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar"

const DashBoardLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="relative h-full">
            <SideBar />
            <main className="md:pl-72">
                <NavBar />
                main
                {children}
            </main>
        </div>
    )
}

export default DashBoardLayout