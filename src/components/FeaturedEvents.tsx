import {Calendar, MapPin, Users, Ticket} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useEvents} from "@/state/hooks/useEvents";

const FeaturedEvents = () => {
    const {events} = useEvents();
    const navigate = useNavigate();

    // Show only featured events, limit to 4
    const featuredEvents = events.filter(event => event.featured).slice(0, 4);

    const handleBookNow = (eventId: number) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <section className="relative z-10 py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Featured Events
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Discover the hottest events happening near you. From concerts to conferences,
                        we've got something for everyone.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredEvents.map((event) => (
                        <Link key={event.id} to={`/events/${event.id}`}>
                            <Card
                                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group cursor-pointer">
                                <div className="relative overflow-hidden rounded-t-lg -mt-10">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
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

                                <CardContent className="p-4">
                                    <div className="mb-3">
                                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 mb-2">
                                            {event.category}
                                        </Badge>
                                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                            {event.title}
                                        </h3>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-400 mb-4">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-2"/>
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-2"/>
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-2"/>
                                            <span>{event.attendees} attending</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-purple-400">
                                            {event.price}
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleBookNow(event.id);
                                            }}
                                        >
                                            <Ticket className="h-4 w-4 mr-1"/>
                                            Book Now
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/events">
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white/30 text-[#561888] hover:text-white cursor-pointer hover:bg-white/10 px-8 py-4 text-lg rounded-full"
                        >
                            View All Events
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;
