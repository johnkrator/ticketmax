import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="relative z-10 bg-app-background text-white backdrop-blur-md border-t border-white/10 mt-0">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            TicketProMax
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
                            <Link to="/dashboard" className="block text-gray-400 hover:text-white transition-colors">
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
                    <p>&copy; {new Date().getFullYear()} TicketProMax. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;