import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Container from "@/components/Container.tsx";

const Home = () => {
    return (
        <div
            className="min-h-screen bg-app-background text-white relative overflow-hidden">
            <Container>
                {/* Hero Section */}
                <HeroSection/>

                {/* Featured Events */}
                <FeaturedEvents/>

                {/* How It Works */}
                <HowItWorks/>

                {/* Testimonials */}
                <Testimonials/>
            </Container>
        </div>
    );
};

export default Home;
