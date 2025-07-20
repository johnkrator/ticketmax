import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-app-gradient text-white">
            <div className="text-center relative z-10">
                <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    404
                </h1>
                <p className="text-xl text-gray-300 mb-4">Oops! Page not found</p>
                <a
                    href="/"
                    className="text-purple-400 hover:text-purple-300 underline transition-colors"
                >
                    Return to Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
