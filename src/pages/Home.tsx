import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

const Home = () => {
    return (
        <div
            className="min-h-screen bg-app-background text-white relative overflow-hidden">
            {/* Hero Section */}
            <HeroSection/>

            {/* Featured Events */}
            <FeaturedEvents/>

            {/* How It Works */}
            <HowItWorks/>

            {/* Testimonials */}
            <Testimonials/>
        </div>
    );
};

export default Home;
