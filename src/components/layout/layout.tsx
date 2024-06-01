import { Outlet } from "react-router-dom";
import MainNavBar from "./header/mainHeader";
import Siderbar from "./sidebar/sideBar";
import MainFooter from "./footer/mainFooter";
import DashBoardFooter from "./footer/dashboardFooter";
import DashBoardNavBar from "./header/dashboardHeader";

const DashboardLayout = () => {
    return (
        <>
            <div className="flex">
                <Siderbar />
                <Outlet />
            </div>
        </>
    );
};
const LandingPageLayout = () => {
    return (
        <>
            {/* <DashBoardNavBar></DashBoardNavBar> */}
            <MainNavBar></MainNavBar>
            <Outlet></Outlet>
            <MainFooter></MainFooter>
            {/* <DashBoardFooter></DashBoardFooter> */}
        </>
    );
}

export { DashboardLayout, LandingPageLayout };
