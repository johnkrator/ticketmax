import {Link} from "react-router-dom";
import {BRAND_NAME, BRAND_COPYRIGHT} from "@/config/brand";
import Container from "@/components/Container.tsx";

const Footer = () => {
    return (
        <footer className="bg-app-background text-white py-12">
            <Container>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <Link to="/" className="text-2xl font-bold text-white">
                            <span
                                className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {BRAND_NAME}
                            </span>
                            </Link>
                            <p className="text-gray-300 mt-4">
                                Your gateway to unforgettable experiences. Discover and book tickets for events
                                worldwide.
                            </p>
                        </div>

                        <div className="md:col-span-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div>
                                    <h4 className="font-semibold mb-4">Quick Links</h4>
                                    <div className="space-y-2">
                                        <Link to="/events"
                                              className="block text-gray-400 hover:text-white transition-colors">
                                            Browse Events
                                        </Link>
                                        <Link to="/auth/register"
                                              className="block text-gray-400 hover:text-white transition-colors">
                                            Create Account
                                        </Link>
                                        <Link to="/support"
                                              className="block text-gray-400 hover:text-white transition-colors">
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
                                        <Link to="/scan"
                                              className="block text-gray-400 hover:text-white transition-colors">
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
                        </div>
                    </div>

                    <div className="border-t border-white/20 mt-8 pt-8 text-center">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p>{BRAND_COPYRIGHT}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;