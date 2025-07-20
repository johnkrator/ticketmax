import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Search, Calendar, MapPin, Users, Ticket} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useEvents} from "@/contexts/EventsContext";

const Events = () => {
    const navigate = useNavigate();
    const {events} = useEvents();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedLocation, setSelectedLocation] = useState("all");

    const categories = ["all", "Music", "Technology", "Art", "Food", "Comedy", "Sports"];
    const locations = ["all", "New York", "California", "Washington DC", "Chicago", "Florida"];

    // Filter events based on search query, category, and location
    const filteredEvents = events.filter(event => {
        const matchesSearch = searchQuery === "" ||
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;

        const matchesLocation = selectedLocation === "all" ||
            event.location.toLowerCase().includes(selectedLocation.toLowerCase());

        return matchesSearch && matchesCategory && matchesLocation;
    });

    const handleBookNow = (eventId: number) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div
            className="min-h-screen bg-app-gradient text-white relative overflow-hidden">
            {/* Header */}
            <div className="relative z-10 py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                            Discover Events
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Find amazing events happening near you. From concerts to conferences,
                            workshops to festivals.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-app-glass rounded-2xl p-6 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                    <Input
                                        type="text"
                                        placeholder="Search events, artists, venues..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-12 bg-app-surface border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="bg-app-surface border-white/20 text-white">
                                    <SelectValue placeholder="Category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category === "all" ? "All Categories" : category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger className="bg-app-surface border-white/20 text-white">
                                    <SelectValue placeholder="Location"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map((location) => (
                                        <SelectItem key={location} value={location}>
                                            {location === "all" ? "All Locations" : location}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mb-6">
                        <p className="text-gray-400">
                            {filteredEvents.length === events.length
                                ? `Showing all ${events.length} events`
                                : `Showing ${filteredEvents.length} of ${events.length} events`}
                        </p>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event) => (
                            <Card key={event.id}
                                  onClick={() => navigate(`/events/${event.id}`)}
                                  className="bg-app-surface hover:bg-app-surface-hover transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group cursor-pointer">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {event.featured && (
                                        <Badge
                                            className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                            Featured
                                        </Badge>
                                    )}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                </div>

                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        <Badge variant="secondary"
                                               className="bg-purple-500/20 text-purple-300 mb-3">
                                            {event.category}
                                        </Badge>
                                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {event.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3 text-sm text-gray-400 mb-6">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-3"/>
                                            <span>{event.date} at {event.time}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-3"/>
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-3"/>
                                            <span>{event.attendees} attending</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-purple-400">
                                            {event.price}
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleBookNow(event.id);
                                            }}
                                        >
                                            <Ticket className="h-4 w-4 mr-2"/>
                                            Book Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Load More Button */}
                    {filteredEvents.length > 0 && (
                        <div className="text-center mt-12">
                            <Button
                                onClick={() => {
                                }}
                                variant="outline"
                                className="border-white/30 text-white hover:bg-app-surface-hover"
                            >
                                Load More Events
                            </Button>
                        </div>
                    )}

                    {/* No results message */}
                    {filteredEvents.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-400 mb-4">No events found matching your criteria</p>
                            <Button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                    setSelectedLocation("all");
                                }}
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/10"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
