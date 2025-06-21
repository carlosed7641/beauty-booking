import { ReactNode } from "react"

export const Dialog = ({ children }: { children: ReactNode }) => {
    return (
        <div className="absolute w-[200px] top-[47px] bg-white shadow-lg rounded-md">
            {children}
            <span className="absolute right-[80px] bottom-full h-5 w-5 box-border
        border-b-8 border-b-white
        border-l-8  border-l-transparent
        border-r-8 border-r-transparent"></span>
            <span className="w-full absolute right-0 left-0 bottom-full h-6 box-border"></span>
        </div>
    )
}
