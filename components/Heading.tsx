import { LucideIcon } from "lucide-react";

interface heading {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

const Heading = ({ title, description, icon: Icon, iconColor, bgColor }: heading) => {
    return (
        <>
            <div className="flex gap-2 items-center px-4">
                <Icon  className={`${iconColor} ${bgColor} h-10 w-10  p-1 rounded`} />
                <div>
                    <h1 className="font-semibold text-2xl">{title}</h1>
                    <p className="font-light">{description}</p>
                </div>
            </div>
        </>
    )
}

export default Heading