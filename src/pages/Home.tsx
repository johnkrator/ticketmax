import {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FloatingShapes from "@/components/FloatingShapes";

const Home = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <FloatingShapes/>

            {/* Navigation */}
            <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex-shrink-0"
                        >
                            TicketMax
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link to="/events" className="hover:text-purple-300 transition-colors">
                                Events
                            </Link>
                            <Link to="/how-it-works" className="hover:text-purple-300 transition-colors">
                                How It Works
                            </Link>
                            <Link to="/support" className="hover:text-purple-300 transition-colors">
                                Support
                            </Link>
                        </div>

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-3">
                            <Link to="/auth/login">
                                <Button
                                    variant="ghost"
                                    className="text-white cursor-pointer hover:text-white hover:bg-white/10 text-sm px-4 py-2"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/auth/register">
                                <Button
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 cursor-pointer hover:from-purple-700 hover:to-pink-700 text-sm px-4 py-2">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6"/>
                            ) : (
                                <Menu className="h-6 w-6"/>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "max-h-96 opacity-100 mt-4"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}>
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-4 space-y-4">
                            {/* Mobile Navigation Links */}
                            <div className="flex flex-col space-y-3">
                                <Link
                                    to="/events"
                                    className="block py-2 px-3 rounded-md hover:bg-white/10 hover:text-purple-300 transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Events
                                </Link>
                                <Link
                                    to="/how-it-works"
                                    className="block py-2 px-3 rounded-md hover:bg-white/10 hover:text-purple-300 transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    How It Works
                                </Link>
                                <Link
                                    to="/support"
                                    className="block py-2 px-3 rounded-md hover:bg-white/10 hover:text-purple-300 transition-colors"
                                    onClick={closeMobileMenu}
                                >
                                    Support
                                </Link>
                            </div>

                            {/* Mobile Auth Buttons */}
                            <div
                                className="border-t border-white/10 pt-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <Link to="/auth/login" onClick={closeMobileMenu} className="flex-1">
                                    <Button
                                        variant="ghost"
                                        className="w-full text-white hover:text-white hover:bg-white/10"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/auth/register" onClick={closeMobileMenu} className="flex-1">
                                    <Button
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="sm:col-span-2 lg:col-span-1">
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
                                <Link to="/events" className="block text-gray-400 hover:text-white transition-colors">
                                    Browse Events
                                </Link>
                                <Link to="/auth/register"
                                      className="block text-gray-400 hover:text-white transition-colors">
                                    Create Account
                                </Link>
                                <Link to="/support" className="block text-gray-400 hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">For Organizers</h4>
                            <div className="space-y-2">
                                <Link to="/events/create"
                                      className="block text-gray-400 hover:text-white transition-colors">
                                    Create Event
                                </Link>
                                <Link to="/dashboard"
                                      className="block text-gray-400 hover:text-white transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/scan" className="block text-gray-400 hover:text-white transition-colors">
                                    Scan Tickets
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                    Twitter
                                </a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                    Instagram
                                </a>
                                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} TicketMax. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
