import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FloatingShapes from "@/components/FloatingShapes";

const Home = () => {
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <FloatingShapes/>

            {/* Navigation */}
            <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/"
                          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        TicketMax
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/events" className="hover:text-purple-300 transition-colors">Events</Link>
                        <Link to="/how-it-works" className="hover:text-purple-300 transition-colors">How It Works</Link>
                        <Link to="/support" className="hover:text-purple-300 transition-colors">Support</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/auth/login">
                            <Button variant="ghost"
                                    className="text-white cursor-pointer hover:text-white hover:bg-white/10">
                                Login
                            </Button>
                        </Link>
                        <Link to="/auth/register">
                            <Button
                                className="bg-gradient-to-r from-purple-600 to-pink-600 cursor-pointer hover:from-purple-700 hover:to-pink-700">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <HeroSection/>

            {/* Featured Events */}
            <FeaturedEvents/>

            {/* How It Works */}
            <HowItWorks/>

            {/* Testimonials */}
            <Testimonials/>

            {/* Footer */}
            <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10 mt-20">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                                TicketVerse
                            </h3>
                            <p className="text-gray-400">
                                Your gateway to unforgettable experiences. Discover and book tickets for events
                                worldwide.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <div className="space-y-2">
                                <Link to="/events" className="block text-gray-400 hover:text-white transition-colors">Browse
                                    Events</Link>
                                <Link to="/auth/register"
                                      className="block text-gray-400 hover:text-white transition-colors">Create
                                    Account</Link>
                                <Link to="/support" className="block text-gray-400 hover:text-white transition-colors">Help
                                    Center</Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">For Organizers</h4>
                            <div className="space-y-2">
                                <Link to="/events/create"
                                      className="block text-gray-400 hover:text-white transition-colors">Create
                                    Event</Link>
                                <Link to="/dashboard"
                                      className="block text-gray-400 hover:text-white transition-colors">Dashboard</Link>
                                <Link to="/scan" className="block text-gray-400 hover:text-white transition-colors">Scan
                                    Tickets</Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <div className="space-y-2">
                                <a href="#"
                                   className="block text-gray-400 hover:text-white transition-colors">Twitter</a>
                                <a href="#"
                                   className="block text-gray-400 hover:text-white transition-colors">Instagram</a>
                                <a href="#"
                                   className="block text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 TicketVerse. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
