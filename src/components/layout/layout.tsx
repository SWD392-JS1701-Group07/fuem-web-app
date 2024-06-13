import MainFooter from "./footer/mainFooter";
import DashBoardFooter from "./footer/dashboardFooter";
import DashBoardNavBar from "./header/dashboardHeader";
import { Outlet, useLocation } from 'react-router-dom'
import MainNavBar from './header/mainHeader'
import Siderbar from './sidebar/sideBar'
import { Toaster } from "../ui/toaster"
import { useSelector } from "react-redux";

const DashboardLayout = () => {
    return (
        <>
            <div className="flex">
                <Siderbar />
                <Outlet />
            </div>
        </>
    )
}
const LandingPageLayout = () => {
    const loginedUser = useSelector((state: any) => state.loginedUser);
    const location = useLocation()
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
    console.log(loginedUser)
    return (
        <>
            {(loginedUser.role === 0) ? ((!isAuthPage) ? <MainNavBar /> : "") : <DashBoardNavBar />}
            <Outlet></Outlet>
            {(loginedUser.role === 0) ? ((!isAuthPage) ? <MainFooter /> : "") : <DashBoardFooter />}
            <Toaster />
        </>
    );
}

export { DashboardLayout, LandingPageLayout }
