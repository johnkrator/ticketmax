import {createContext} from "react";

export interface EventItem {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    price: string;
    image: string;
    category: string;
    attendees: string;
    featured: boolean;
    description: string;
}

export interface EventsContextType {
    events: EventItem[];
    addEvent: (event: Omit<EventItem, "id">) => void;
}

export const EventsContext = createContext<EventsContextType | undefined>(undefined);
