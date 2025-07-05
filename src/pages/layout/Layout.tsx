import Header from "./Header";
import { Outlet } from "react-router-dom";
import SideNavBar from "./SideNavBar";

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex">
                <SideNavBar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
