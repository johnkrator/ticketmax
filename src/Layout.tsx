import {Outlet, useLocation} from "react-router-dom";
import {Toaster as Sonner} from "@/components/ui/sonner";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import FloatingShapes from "@/components/FloatingShapes.tsx";

const Layout = () => {
    const location = useLocation();
    const isAuthRoute = location.pathname === "/auth/login" || location.pathname === "/auth/register" || location.pathname === "/auth/email-verification";

    return (
        <div className="flex flex-col min-h-screen relative">
            {/* Global animated background shapes - ensure it's always visible */}
            <FloatingShapes/>

            <Sonner/>
            {!isAuthRoute && <Navbar/>}
            <main className="flex-1 relative z-10 overflow-hidden">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;