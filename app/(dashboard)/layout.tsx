
const DashBoardLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="relative h-full">
            <div className="sidebar hidden h-full md:flex md:fixed md:w-72 bg-zinc-900">
                <div>
                    Hello , dewang
                </div>
            </div>
            <main></main>
        </div>
    )
}

export default DashBoardLayout