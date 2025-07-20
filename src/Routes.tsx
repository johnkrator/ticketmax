import {createBrowserRouter, ScrollRestoration} from "react-router-dom";
import Layout from "@/Layout.tsx";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import EmailVerification from "@/pages/auth/EmailVerification.tsx";
import NotFound from "@/pages/NotFound.tsx";
import Events from "@/pages/Events.tsx";
import EventDetails from "@/pages/EventDetails.tsx";
import CreateEvent from "@/pages/CreateEvent.tsx";
import HowItWorks from "@/pages/HowItWorks.tsx";
import Support from "@/pages/Support.tsx";
import TicketPreview from "@/pages/TicketPreview.tsx";
import Payment from "@/pages/Payment.tsx";
import PaymentSuccess from "@/pages/PaymentSuccess.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import VerificationPending from "@/pages/VerificationPending.tsx";
import OrganizerOnboarding from "@/pages/OrganizerOnboarding.tsx";
import Profile from "@/pages/Profile.tsx";
import BookingHistory from "@/pages/BookingHistory.tsx";
import DashboardProtectedRoute from "@/components/DashboardProtectedRoute.tsx";

const Routes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                    <ScrollRestoration/>
                    <Layout/>
                </>
            ),
            children: [
                {path: "", element: <Home/>},
                {path: "events", element: <Events/>},
                {path: "events/:id", element: <EventDetails/>},
                {path: "events/create", element: <CreateEvent/>},
                {path: "how-it-works", element: <HowItWorks/>},
                {path: "support", element: <Support/>},
                {path: "auth/login", element: <Login/>},
                {path: "auth/register", element: <Register/>},
                {path: "auth/email-verification", element: <EmailVerification/>},
                {path: "auth/organizer-onboarding", element: <OrganizerOnboarding/>},
                {path: "auth/verification-pending", element: <VerificationPending/>},
                {path: "ticket-preview", element: <TicketPreview/>},
                {path: "payment", element: <Payment/>},
                {path: "payment/success", element: <PaymentSuccess/>},
                {
                    path: "dashboard",
                    element: (
                        <DashboardProtectedRoute>
                            <Dashboard/>
                        </DashboardProtectedRoute>
                    )
                },
                {path: "profile", element: <Profile/>},
                {path: "booking-history", element: <BookingHistory/>},
                {path: "*", element: <NotFound/>}
            ]
        }
    ]);
};

export default Routes;