import { Separator } from "@/components/ui/separator"

const DashBoardNavBar = () => {
    return (
        <div>
            <header className="z-50 w-full bg-white">
                <div
                    id="navbar-container"
                    className="relative m-auto flex w-full max-w-full items-center justify-between px-10 py-6 text-left"
                >
                    <div id="title-container">
                        <h1 className="font-poppins text-3xl font-semibold text-gray-900">
                            <a href="#">Event Management</a>
                        </h1>
                    </div>
                    <div id="nav">
                        <ul className="flex space-x-6">
                            <li className="font-poppins font-medium">
                                <a href="#">Avatar</a>
                            </li>
                            <li className="font-poppins font-medium">
                                <a href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator className="" />
            </header>
        </div>
    )
}
export default DashBoardNavBar;