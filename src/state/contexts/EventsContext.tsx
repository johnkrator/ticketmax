import {useState, type ReactNode} from "react";
import {type EventItem, EventsContext} from "./EventsContextTypes.ts";

export const EventsProvider = ({children}: { children: ReactNode }) => {
    const [events, setEvents] = useState<EventItem[]>([
        {
            id: 1,
            title: "Summer Music Festival 2024",
            date: "Aug 15, 2024",
            time: "6:00 PM",
            location: "Central Park, NY",
            price: "$89",
            image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
            category: "Music",
            attendees: "5.2K",
            featured: true,
            description: "The biggest summer music festival featuring top artists from around the world."
        },
        {
            id: 2,
            title: "Tech Innovation Summit",
            date: "Sep 20, 2024",
            time: "9:00 AM",
            location: "Silicon Valley, CA",
            price: "$199",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
            category: "Technology",
            attendees: "1.8K",
            featured: true,
            description: "Discover the latest in tech innovation with industry leaders and pioneers."
        },
        {
            id: 3,
            title: "Art & Culture Expo",
            date: "Oct 5, 2024",
            time: "10:00 AM",
            location: "Museum District, DC",
            price: "$45",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            category: "Art",
            attendees: "2.1K",
            featured: true,
            description: "Immerse yourself in contemporary art and cultural experiences."
        },
        {
            id: 4,
            title: "Food & Wine Festival",
            date: "Nov 12, 2024",
            time: "2:00 PM",
            location: "Napa Valley, CA",
            price: "$125",
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
            category: "Food",
            attendees: "3.5K",
            featured: false,
            description: "Taste exquisite wines and gourmet cuisine from renowned chefs."
        },
        {
            id: 5,
            title: "Comedy Night Special",
            date: "Aug 25, 2024",
            time: "8:00 PM",
            location: "Comedy Club, Chicago",
            price: "$35",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
            category: "Comedy",
            attendees: "800",
            featured: false,
            description: "Laugh out loud with the best comedians in the business."
        },
        {
            id: 6,
            title: "Fitness Bootcamp Weekend",
            date: "Sep 8, 2024",
            time: "7:00 AM",
            location: "Miami Beach, FL",
            price: "$75",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
            category: "Sports",
            attendees: "1.2K",
            featured: true,
            description: "Transform your fitness with this intensive weekend bootcamp."
        }
    ]);

    const addEvent = (newEvent: Omit<EventItem, "id">) => {
        const id = Math.max(...events.map(e => e.id)) + 1;
        setEvents(prev => [...prev, {...newEvent, id}]);
    };

    return (
        <EventsContext.Provider value={{events, addEvent}}>
            {children}
        </EventsContext.Provider>
    );
};
