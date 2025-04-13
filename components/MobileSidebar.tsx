import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "./SideBar";

const MobileSidebar = ()=>{
    return <Sheet>
        <SheetTrigger>
            <Button className="md:hidden">
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent>
            <SideBar />
        </SheetContent>
    </Sheet>
}

export default MobileSidebar;