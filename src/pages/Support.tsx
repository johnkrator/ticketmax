import React, {useState} from "react";
import {Search, MessageCircle, Phone, Mail, Clock, ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Textarea} from "@/components/ui/textarea";
import Container from "@/components/Container.tsx";

const Support = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const faqs = [
        {
            question: "How do I book tickets for an event?",
            answer: "Simply browse our events page, select your desired event, choose your tickets, and complete the secure checkout process. You'll receive your digital tickets via email instantly."
        },
        {
            question: "Can I transfer my tickets to someone else?",
            answer: "Yes! You can transfer tickets to friends or family through your ticket management dashboard. Just enter their email address and they'll receive the tickets directly."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, and digital wallets. All payments are processed securely through our payment partners."
        },
        {
            question: "How do I get a refund for my tickets?",
            answer: "Refund policies vary by event. Check the specific event's refund policy on the event page. For eligible refunds, contact our support team with your ticket details."
        },
        {
            question: "What if I lose my digital ticket?",
            answer: "Don't worry! You can always access your tickets through your account dashboard. We also send backup copies to your email address."
        },
        {
            question: "How early should I arrive at the venue?",
            answer: "We recommend arriving 30-60 minutes before the event start time to allow for entry processing and finding your seats."
        }
    ];

    const contactMethods = [
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Get instant help from our support team",
            availability: "24/7 Available",
            action: "Start Chat"
        },
        {
            icon: Mail,
            title: "Email Support",
            description: "Send us a detailed message",
            availability: "Response within 24 hours",
            action: "Send Email"
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Speak directly with our team",
            availability: "Mon-Fri 9AM-6PM",
            action: "Call Now"
        }
    ];

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Contact form submitted:", contactForm);
    };

    return (
        <div
            className="min-h-screen bg-app-background text-white relative overflow-hidden">

            <Container>
                <div className="relative z-10">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                How Can We Help?
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Find answers to common questions or get in touch with our support team
                            </p>
                        </div>

                        {/* Search */}
                        <div className="max-w-2xl mx-auto mb-16">
                            <div className="relative">
                                <Search
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                                <Input
                                    type="text"
                                    placeholder="Search for help articles, FAQs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-gray-400 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Contact Methods */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            {contactMethods.map((method, index) => (
                                <Card key={index}
                                      className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center">
                                    <CardContent className="p-6">
                                        <method.icon className="h-12 w-12 mx-auto mb-4 text-purple-400"/>
                                        <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                                        <p className="text-gray-400 mb-3">{method.description}</p>
                                        <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                                            <Clock className="h-4 w-4 mr-1"/>
                                            {method.availability}
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                            {method.action}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* FAQ Section */}
                        <div className="max-w-4xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked
                                Questions</h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <Card key={index} className="bg-white/5 backdrop-blur-md border-white/10">
                                        <CardHeader
                                            className="cursor-pointer hover:bg-white/5 transition-colors"
                                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-white text-left">{faq.question}</CardTitle>
                                                {expandedFaq === index ?
                                                    <ChevronUp className="h-5 w-5 text-purple-400"/> :
                                                    <ChevronDown className="h-5 w-5 text-purple-400"/>
                                                }
                                            </div>
                                        </CardHeader>
                                        {expandedFaq === index && (
                                            <CardContent className="pt-0">
                                                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                                            </CardContent>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="max-w-2xl mx-auto">
                            <Card className="bg-white/5 backdrop-blur-md border-white/10">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-white text-center">Send us a
                                        Message</CardTitle>
                                    <p className="text-gray-400 text-center">Can't find what you're looking for? We're
                                        here
                                        to help!</p>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleContactSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label
                                                    className="text-sm font-medium text-gray-300 mb-2 block">Name</label>
                                                <Input
                                                    type="text"
                                                    placeholder="Your name"
                                                    value={contactForm.name}
                                                    onChange={(e) => setContactForm({
                                                        ...contactForm,
                                                        name: e.target.value
                                                    })}
                                                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                                                <Input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={contactForm.email}
                                                    onChange={(e) => setContactForm({
                                                        ...contactForm,
                                                        email: e.target.value
                                                    })}
                                                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                className="text-sm font-medium text-gray-300 mb-2 block">Subject</label>
                                            <Input
                                                type="text"
                                                placeholder="What's this about?"
                                                value={contactForm.subject}
                                                onChange={(e) => setContactForm({
                                                    ...contactForm,
                                                    subject: e.target.value
                                                })}
                                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="text-sm font-medium text-gray-300 mb-2 block">Message</label>
                                            <Textarea
                                                placeholder="Tell us more about your question or issue..."
                                                value={contactForm.message}
                                                onChange={(e) => setContactForm({
                                                    ...contactForm,
                                                    message: e.target.value
                                                })}
                                                className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
                                        >
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Support;
