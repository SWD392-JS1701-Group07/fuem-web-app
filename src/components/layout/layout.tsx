import MainFooter from "./footer/mainFooter";
// import DashBoardFooter from "./footer/dashboardFooter";
// import DashBoardNavBar from "./header/dashboardHeader";
import { Outlet, useLocation } from 'react-router-dom'
import MainNavBar from './header/mainHeader'
import Siderbar from './sidebar/sideBar'
import { Toaster } from "../ui/toaster";
import PrivateRoute from "../common/PrivateRoute";

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
    const location = useLocation()
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
    return (
        <>
            {/* <DashBoardNavBar></DashBoardNavBar> */}
            {!isAuthPage && <MainNavBar />}
            <Outlet></Outlet>
            {!isAuthPage && <MainFooter />}
            <Toaster />
            {/* <DashBoardFooter></DashBoardFooter> */}
        </>
    );
}

export { DashboardLayout, LandingPageLayout }
