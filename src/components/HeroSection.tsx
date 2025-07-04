import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ArrowRight, Search, Calendar} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate("/events");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <section className="relative z-10 py-20 px-4">
            <div className="container mx-auto text-center">
                <div className="animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                        Your Gateway to
                        <br/>
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Unforgettable Events
            </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        Discover amazing concerts, festivals, workshops, and experiences.
                        Book your tickets instantly with secure payments.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12 animate-scale-in">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                        <Input
                            type="text"
                            placeholder="Search for events, artists, or venues..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-purple-500"
                        />
                        <Button
                            size="sm"
                            onClick={handleSearch}
                            className="absolute right-2 top-1/2 cursor-pointer transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full"
                        >
                            Search
                        </Button>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
                    <Link to="/events">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 cursor-pointer to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                            Browse Events
                            <ArrowRight className="ml-2 h-5 w-5"/>
                        </Button>
                    </Link>

                    <Link to="/auth/organizer-onboarding">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white/30 text-[#561888] hover:text-white cursor-pointer hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Create Event
                            <Calendar className="ml-2 h-5 w-5"/>
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center animate-fade-in">
                        <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
                        <div className="text-gray-300">Events Hosted</div>
                    </div>
                    <div className="text-center animate-fade-in">
                        <div className="text-3xl font-bold text-pink-400 mb-2">2M+</div>
                        <div className="text-gray-300">Tickets Sold</div>
                    </div>
                    <div className="text-center animate-fade-in">
                        <div className="text-3xl font-bold text-blue-400 mb-2">100K+</div>
                        <div className="text-gray-300">Happy Customers</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;