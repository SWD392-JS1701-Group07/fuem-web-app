import { Outlet } from "react-router-dom";
import Header from "./header";
import Siderbar from "./sidebar";
import Footer from "./footer";

const DashboardLayout = () => {
    return (
        <>
            <Siderbar />
            <Outlet />
        </>
    );
};
const LandingPageLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
}

export { DashboardLayout, LandingPageLayout };
