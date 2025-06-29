import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {Calendar, MapPin, DollarSign, Users, ArrowLeft, Upload, Clock} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import {useEvents} from "@/contexts/EventsContext";
import FloatingShapes from "@/components/FloatingShapes";

const CreateEvent = () => {
    const navigate = useNavigate();
    const {addEvent} = useEvents();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        ticketPrice: "",
        totalTickets: "",
        image: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("Image size should be less than 5MB");
                return;
            }

            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Please upload a valid image file (JPEG, PNG, or WebP)");
                return;
            }

            setImageFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // In a real app, you would upload the image to a storage service here
        // For now, we'll use the preview URL or fallback to a default image
        const imageUrl = imagePreview || eventData.image || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop";

        // Create the new event
        const newEvent = {
            title: eventData.title,
            description: eventData.description,
            date: eventData.date,
            time: eventData.time,
            location: eventData.location,
            category: eventData.category,
            price: `$${eventData.ticketPrice}`,
            image: imageUrl,
            attendees: "0",
            featured: false
        };

        // Simulate event creation
        setTimeout(() => {
            addEvent(newEvent);
            setIsSubmitting(false);
            toast.success("Event created successfully!");
            navigate("/events");
        }, 2000);
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
            <FloatingShapes/>

            {/* Navigation */}
            <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/"
                          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        TicketVerse
                    </Link>
                </div>
            </nav>

            <div className="relative z-10 py-8 px-4">
                <div className="container mx-auto max-w-4xl">
                    <Link to="/dashboard"
                          className="inline-flex items-center text-purple-300 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2"/>
                        Back to Dashboard
                    </Link>

                    <Card className="bg-white/5 backdrop-blur-md border-white/10">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-white">Create New Event</CardTitle>
                            <p className="text-gray-400">Fill in the details to create your event</p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Event Title *</label>
                                        <Input
                                            name="title"
                                            placeholder="Enter event title"
                                            value={eventData.title}
                                            onChange={handleInputChange}
                                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Category *</label>
                                        <select
                                            name="category"
                                            value={eventData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
                                            required
                                        >
                                            <option value="" className="bg-slate-900">Select category</option>
                                            <option value="Music" className="bg-slate-900">Music</option>
                                            <option value="Sports" className="bg-slate-900">Sports</option>
                                            <option value="Art" className="bg-slate-900">Art</option>
                                            <option value="Technology" className="bg-slate-900">Technology</option>
                                            <option value="Business" className="bg-slate-900">Business</option>
                                            <option value="Comedy" className="bg-slate-900">Comedy</option>
                                            <option value="Food" className="bg-slate-900">Food</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Description *</label>
                                    <textarea
                                        name="description"
                                        placeholder="Describe your event..."
                                        value={eventData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 resize-none"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Date *</label>
                                        <div className="relative">
                                            <Calendar
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                name="date"
                                                type="date"
                                                value={eventData.date}
                                                onChange={handleInputChange}
                                                className="pl-10 bg-white/10 border-white/20 text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Time *</label>
                                        <div className="relative">
                                            <Clock
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                name="time"
                                                type="time"
                                                value={eventData.time}
                                                onChange={handleInputChange}
                                                className="pl-10 bg-white/10 border-white/20 text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Location *</label>
                                    <div className="relative">
                                        <MapPin
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                        <Input
                                            name="location"
                                            placeholder="Event location"
                                            value={eventData.location}
                                            onChange={handleInputChange}
                                            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Ticket Price ($) *</label>
                                        <div className="relative">
                                            <DollarSign
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                name="ticketPrice"
                                                type="number"
                                                placeholder="0.00"
                                                value={eventData.ticketPrice}
                                                onChange={handleInputChange}
                                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Total Tickets *</label>
                                        <div className="relative">
                                            <Users
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                name="totalTickets"
                                                type="number"
                                                placeholder="100"
                                                value={eventData.totalTickets}
                                                onChange={handleInputChange}
                                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload Section */}
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-gray-300">Event Image</label>

                                    {/* File Upload */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-3 text-gray-400"/>
                                                    <p className="mb-2 text-sm text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> an image
                                                    </p>
                                                    <p className="text-xs text-gray-500">PNG, JPG, JPEG or WebP (MAX.
                                                        5MB)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                        </div>

                                        {/* Image Preview */}
                                        {imagePreview && (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Event preview"
                                                    className="w-full h-48 object-cover rounded-lg border border-white/20"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2"
                                                    onClick={() => {
                                                        setImageFile(null);
                                                        setImagePreview("");
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        )}

                                        {/* Alternative: Image URL Input */}
                                        {!imagePreview && (
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-400">Or provide an image URL:</p>
                                                <Input
                                                    name="image"
                                                    placeholder="https://example.com/image.jpg"
                                                    value={eventData.image}
                                                    onChange={handleInputChange}
                                                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                                    >
                                        {isSubmitting ? "Creating Event..." : "Create Event"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate("/dashboard")}
                                        className="flex-1 border-white/30 text-[#561888] hover:text-white cursor-pointer hover:bg-white/10"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
