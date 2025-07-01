import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
