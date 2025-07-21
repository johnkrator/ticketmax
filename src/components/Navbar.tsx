import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Menu, X, User, LogOut, Calendar} from "lucide-react";
import {useAuth} from "@/state/hooks/useAuth";
import Container from "@/components/Container.tsx";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const {isAuthenticated, user, logout} = useAuth();
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsUserDropdownOpen(false);
        navigate("/");
    };

    const getUserInitials = () => {
        if (!user) return "U";
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <nav className="sticky top-0 z-50 bg-app-background text-white backdrop-blur-md border-b border-white/10">
            <div className="relative">
                <Container>
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link
                                to="/"
                                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex-shrink-0"
                            >
                                TicketProMax
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

                            {/* Desktop Auth Section */}
                            <div className="hidden md:flex items-center space-x-3">
                                {isAuthenticated && user ? (
                                    // User Dropdown
                                    <div className="relative">
                                        <button
                                            onClick={toggleUserDropdown}
                                            className="flex items-center space-x-2 hover:bg-white/10 rounded-lg p-2 transition-colors"
                                        >
                                            <div
                                                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                {getUserInitials()}
                                            </div>
                                            <span className="text-sm">{user.firstName}</span>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isUserDropdownOpen && (
                                            <div
                                                className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg py-1 z-50">
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors"
                                                >
                                                    <User className="h-4 w-4 mr-3"/>
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/booking-history"
                                                    onClick={() => setIsUserDropdownOpen(false)}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors"
                                                >
                                                    <Calendar className="h-4 w-4 mr-3"/>
                                                    Booking History
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut className="h-4 w-4 mr-3"/>
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Auth Buttons for non-authenticated users
                                    <>
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
                                                className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm px-4 py-2">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden text-white hover:text-purple-300 transition-colors"
                                onClick={toggleMobileMenu}
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        {isMobileMenuOpen && (
                            <div
                                className="md:hidden absolute top-full left-0 right-0 bg-[#1d1132] border-t border-white/10 py-4">
                                <div className="container mx-auto px-4 space-y-4">
                                    <Link
                                        to="/events"
                                        className="block hover:text-purple-300 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Events
                                    </Link>
                                    <Link
                                        to="/how-it-works"
                                        className="block hover:text-purple-300 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        How It Works
                                    </Link>
                                    <Link
                                        to="/support"
                                        className="block hover:text-purple-300 transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        Support
                                    </Link>

                                    {isAuthenticated && user ? (
                                        <div className="pt-4 border-t border-white/10 space-y-2">
                                            <div className="flex items-center space-x-2 mb-3">
                                                <div
                                                    className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                    {getUserInitials()}
                                                </div>
                                                <span className="text-sm">{user.firstName} {user.lastName}</span>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="block hover:text-purple-300 transition-colors"
                                                onClick={closeMobileMenu}
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                to="/booking-history"
                                                className="block hover:text-purple-300 transition-colors"
                                                onClick={closeMobileMenu}
                                            >
                                                Booking History
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    closeMobileMenu();
                                                }}
                                                className="block text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="pt-4 border-t border-white/10 space-y-2">
                                            <Link to="/auth/login" onClick={closeMobileMenu}>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full text-white cursor-pointer hover:text-white hover:bg-white/10"
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link to="/auth/register" onClick={closeMobileMenu}>
                                                <Button
                                                    className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </nav>
    );
};

export default Navbar;