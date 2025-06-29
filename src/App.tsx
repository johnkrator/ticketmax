import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {EventsProvider} from "./contexts/EventsContext";
import Home from "./pages/Home.tsx";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import HowItWorks from "./pages/HowItWorks";
import Support from "./pages/Support";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TicketPreview from "./pages/TicketPreview";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import TicketVerification from "./pages/TicketVerification";
import NotFound from "./pages/NotFound";
import {Toaster} from "sonner";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <EventsProvider>
                <Toaster/>
                <Sonner/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/events" element={<Events/>}/>
                        <Route path="/events/:id" element={<EventDetails/>}/>
                        <Route path="/events/create" element={<CreateEvent/>}/>
                        <Route path="/how-it-works" element={<HowItWorks/>}/>
                        <Route path="/support" element={<Support/>}/>
                        <Route path="/auth/login" element={<Login/>}/>
                        <Route path="/auth/register" element={<Register/>}/>
                        <Route path="/ticket-preview" element={<TicketPreview/>}/>
                        <Route path="/payment" element={<Payment/>}/>
                        <Route path="/payment/success" element={<PaymentSuccess/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/verify-tickets" element={<TicketVerification/>}/>
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </EventsProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
