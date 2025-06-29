import {Outlet, useLocation} from "react-router-dom";
import {Toaster as Sonner} from "@/components/ui/sonner";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

const Layout = () => {
    const location = useLocation();
    const isAuthRoute = location.pathname === "/auth/login" || location.pathname === "/auth/register";

    return (
        <div className="flex flex-col min-h-screen">
            <Sonner/>
            {!isAuthRoute && <Navbar/>}
            <main className="flex-1">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;