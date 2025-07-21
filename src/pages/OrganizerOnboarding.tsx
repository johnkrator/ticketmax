import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {
    User,
    Building,
    FileText,
    CheckCircle,
    Upload,
    MapPin,
    ArrowRight,
    ArrowLeft,
    Shield,
    AlertCircle,
    Mail,
    Phone,
    Calendar,
    Globe,
    CreditCard,
    Star
} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

interface OrganizerData {
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;

    // Organization Information
    organizationType: "individual" | "company" | "nonprofit";
    organizationName: string;
    businessRegistrationNumber: string;
    taxId: string;
    website: string;
    description: string;

    // Address Information
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;

    // Verification Documents
    idDocument: File | null;
    businessLicense: File | null;
    taxDocument: File | null;

    // Bank Information
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    accountHolderName: string;

    // Experience
    eventExperience: string;
    previousEvents: string;
    expectedEventVolume: string;
}

const OrganizerOnboarding: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState<OrganizerData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        organizationType: "individual",
        organizationName: "",
        businessRegistrationNumber: "",
        taxId: "",
        website: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
        idDocument: null,
        businessLicense: null,
        taxDocument: null,
        bankName: "",
        accountNumber: "",
        routingNumber: "",
        accountHolderName: "",
        eventExperience: "",
        previousEvents: "",
        expectedEventVolume: ""
    });

    const totalSteps = 6;
    const progress = (currentStep / totalSteps) * 100;

    const handleInputChange = (field: keyof OrganizerData, value: string) => {
        setData(prev => ({...prev, [field]: value}));
    };

    const handleFileUpload = (field: keyof OrganizerData, file: File | null) => {
        setData(prev => ({...prev, [field]: file}));
    };

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return !!(data.firstName && data.lastName && data.email && data.phone && data.dateOfBirth);
            case 2:
                return !!(data.organizationType &&
                    (data.organizationType === "individual" || data.organizationName) &&
                    data.description);
            case 3:
                return !!(data.address && data.city && data.state && data.zipCode && data.country);
            case 4:
                return !!(data.idDocument &&
                    (data.organizationType === "individual" || (data.businessLicense && data.taxDocument)));
            case 5:
                return !!(data.bankName && data.accountNumber && data.routingNumber && data.accountHolderName);
            case 6:
                return !!(data.eventExperience && data.expectedEventVolume);
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real app, you would send the data to your backend
            console.log("Onboarding data:", data);

            // Redirect to pending verification page
            navigate("/auth/verification-pending");

        } catch (error) {
            console.error("Onboarding failed:", error);
            alert("Failed to submit onboarding. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <div
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                <User className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Personal Information</h3>
                            <p className="text-gray-400">Tell us about yourself to get started</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-gray-300">First Name *</Label>
                                <div className="relative">
                                    <User
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="firstName"
                                        value={data.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        placeholder="John"
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-gray-300">Last Name *</Label>
                                <div className="relative">
                                    <User
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="lastName"
                                        value={data.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        placeholder="Doe"
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="john@example.com"
                                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-300">Phone Number *</Label>
                            <div className="relative">
                                <Phone
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    placeholder="+1 (555) 123-4567"
                                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth" className="text-gray-300">Date of Birth *</Label>
                            <div className="relative">
                                <Calendar
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={data.dateOfBirth}
                                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                                    className="pl-10 bg-white/10 border-white/20 text-white"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <div
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <Building className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Organization Details</h3>
                            <p className="text-gray-400">Tell us about your organization</p>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-gray-300">Organization Type *</Label>
                            <RadioGroup
                                value={data.organizationType}
                                onValueChange={(value) => handleInputChange("organizationType", value)}
                                className="grid grid-cols-1 gap-3"
                            >
                                <div
                                    className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                    <RadioGroupItem value="individual" id="individual" className="border-white/40"/>
                                    <Label htmlFor="individual" className="text-white cursor-pointer flex-1">
                                        <div>
                                            <div className="font-medium">Individual Event Organizer</div>
                                            <div className="text-sm text-gray-400">Perfect for freelance organizers
                                            </div>
                                        </div>
                                    </Label>
                                </div>
                                <div
                                    className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                    <RadioGroupItem value="company" id="company" className="border-white/40"/>
                                    <Label htmlFor="company" className="text-white cursor-pointer flex-1">
                                        <div>
                                            <div className="font-medium">Company/Business</div>
                                            <div className="text-sm text-gray-400">For established businesses</div>
                                        </div>
                                    </Label>
                                </div>
                                <div
                                    className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                    <RadioGroupItem value="nonprofit" id="nonprofit" className="border-white/40"/>
                                    <Label htmlFor="nonprofit" className="text-white cursor-pointer flex-1">
                                        <div>
                                            <div className="font-medium">Non-Profit Organization</div>
                                            <div className="text-sm text-gray-400">For charitable organizations</div>
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {data.organizationType !== "individual" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="organizationName" className="text-gray-300">Organization Name
                                        *</Label>
                                    <div className="relative">
                                        <Building
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                        <Input
                                            id="organizationName"
                                            value={data.organizationName}
                                            onChange={(e) => handleInputChange("organizationName", e.target.value)}
                                            placeholder="Your Organization Name"
                                            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="businessRegistrationNumber" className="text-gray-300">Business
                                            Registration</Label>
                                        <div className="relative">
                                            <FileText
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                id="businessRegistrationNumber"
                                                value={data.businessRegistrationNumber}
                                                onChange={(e) => handleInputChange("businessRegistrationNumber", e.target.value)}
                                                placeholder="123456789"
                                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="taxId" className="text-gray-300">Tax ID/EIN</Label>
                                        <div className="relative">
                                            <CreditCard
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                            <Input
                                                id="taxId"
                                                value={data.taxId}
                                                onChange={(e) => handleInputChange("taxId", e.target.value)}
                                                placeholder="12-3456789"
                                                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="website" className="text-gray-300">Website</Label>
                                    <div className="relative">
                                        <Globe
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                        <Input
                                            id="website"
                                            value={data.website}
                                            onChange={(e) => handleInputChange("website", e.target.value)}
                                            placeholder="https://yourwebsite.com"
                                            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-300">Description *</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Tell us about yourself and the types of events you plan to organize..."
                                rows={4}
                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <div
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                                <MapPin className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Address Information</h3>
                            <p className="text-gray-400">Where are you located?</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-gray-300">Street Address *</Label>
                                <div className="relative">
                                    <MapPin
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => handleInputChange("address", e.target.value)}
                                        placeholder="123 Main Street"
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-gray-300">City *</Label>
                                    <Input
                                        id="city"
                                        value={data.city}
                                        onChange={(e) => handleInputChange("city", e.target.value)}
                                        placeholder="New York"
                                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-gray-300">State/Province *</Label>
                                    <Input
                                        id="state"
                                        value={data.state}
                                        onChange={(e) => handleInputChange("state", e.target.value)}
                                        placeholder="NY"
                                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode" className="text-gray-300">ZIP/Postal Code *</Label>
                                    <Input
                                        id="zipCode"
                                        value={data.zipCode}
                                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                        placeholder="10001"
                                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country" className="text-gray-300">Country *</Label>
                                    <Input
                                        id="country"
                                        value={data.country}
                                        onChange={(e) => handleInputChange("country", e.target.value)}
                                        placeholder="United States"
                                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <div
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
                                <FileText className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Verification Documents</h3>
                            <p className="text-gray-400">Upload documents for verification</p>
                        </div>

                        <Alert className="bg-blue-500/10 border-blue-500/30">
                            <Shield className="h-4 w-4 text-blue-400"/>
                            <AlertDescription className="text-blue-200">
                                All documents will be securely stored and used only for verification purposes.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <Label htmlFor="idDocument" className="text-gray-300">Government-issued ID *</Label>
                                <div
                                    className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                                    <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400"/>
                                    <Button
                                        variant="outline"
                                        onClick={() => document.getElementById("idDocument")?.click()}
                                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    >
                                        Upload ID Document
                                    </Button>
                                    {data.idDocument && (
                                        <p className="text-sm text-green-400 mt-2">
                                            ✓ {data.idDocument.name}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-2">PDF, JPG, JPEG, or PNG</p>
                                </div>
                                <input
                                    id="idDocument"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => handleFileUpload("idDocument", e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                            </div>

                            {data.organizationType !== "individual" && (
                                <>
                                    <div className="space-y-3">
                                        <Label htmlFor="businessLicense" className="text-gray-300">Business License
                                            *</Label>
                                        <div
                                            className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                                            <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400"/>
                                            <Button
                                                variant="outline"
                                                onClick={() => document.getElementById("businessLicense")?.click()}
                                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                            >
                                                Upload Business License
                                            </Button>
                                            {data.businessLicense && (
                                                <p className="text-sm text-green-400 mt-2">
                                                    ✓ {data.businessLicense.name}
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            id="businessLicense"
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => handleFileUpload("businessLicense", e.target.files?.[0] || null)}
                                            className="hidden"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="taxDocument" className="text-gray-300">Tax Document *</Label>
                                        <div
                                            className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                                            <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400"/>
                                            <Button
                                                variant="outline"
                                                onClick={() => document.getElementById("taxDocument")?.click()}
                                                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                            >
                                                Upload Tax Document
                                            </Button>
                                            {data.taxDocument && (
                                                <p className="text-sm text-green-400 mt-2">
                                                    ✓ {data.taxDocument.name}
                                                </p>
                                            )}
                                        </div>
                                        <input
                                            id="taxDocument"
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => handleFileUpload("taxDocument", e.target.files?.[0] || null)}
                                            className="hidden"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <div
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center">
                                <Shield className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Banking Information</h3>
                            <p className="text-gray-400">Secure payment processing setup</p>
                        </div>

                        <Alert className="bg-amber-500/10 border-amber-500/30">
                            <AlertCircle className="h-4 w-4 text-amber-400"/>
                            <AlertDescription className="text-amber-200">
                                This information is required for payment processing and will be encrypted and stored
                                securely.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bankName" className="text-gray-300">Bank Name *</Label>
                                <div className="relative">
                                    <Building
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="bankName"
                                        value={data.bankName}
                                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                                        placeholder="Bank of America"
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="accountHolderName" className="text-gray-300">Account Holder Name
                                    *</Label>
                                <div className="relative">
                                    <User
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="accountHolderName"
                                        value={data.accountHolderName}
                                        onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                                        placeholder="John Doe"
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="accountNumber" className="text-gray-300">Account Number *</Label>
                                <div className="relative">
                                    <CreditCard
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="accountNumber"
                                        type="password"
                                        value={data.accountNumber}
                                        onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                                        placeholder="••••••••••"
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="routingNumber" className="text-gray-300">Routing Number *</Label>
                                <div className="relative">
                                    <CreditCard
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                    <Input
                                        id="routingNumber"
                                        value={data.routingNumber}
                                        onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                                        placeholder="123456789"
                                        className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <div
                                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                <Star className="h-8 w-8 text-white"/>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Event Experience</h3>
                            <p className="text-gray-400">Tell us about your event organizing experience</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <Label className="text-gray-300">Event Organization Experience *</Label>
                                <RadioGroup
                                    value={data.eventExperience}
                                    onValueChange={(value) => handleInputChange("eventExperience", value)}
                                    className="grid grid-cols-1 gap-3"
                                >
                                    <div
                                        className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                        <RadioGroupItem value="beginner" id="beginner" className="border-white/40"/>
                                        <Label htmlFor="beginner" className="text-white cursor-pointer flex-1">
                                            <div>
                                                <div className="font-medium">New to event organizing</div>
                                                <div className="text-sm text-gray-400">Just starting out</div>
                                            </div>
                                        </Label>
                                    </div>
                                    <div
                                        className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                        <RadioGroupItem value="intermediate" id="intermediate"
                                                        className="border-white/40"/>
                                        <Label htmlFor="intermediate" className="text-white cursor-pointer flex-1">
                                            <div>
                                                <div className="font-medium">1-5 years experience</div>
                                                <div className="text-sm text-gray-400">Some experience organizing
                                                    events
                                                </div>
                                            </div>
                                        </Label>
                                    </div>
                                    <div
                                        className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                        <RadioGroupItem value="experienced" id="experienced"
                                                        className="border-white/40"/>
                                        <Label htmlFor="experienced" className="text-white cursor-pointer flex-1">
                                            <div>
                                                <div className="font-medium">5+ years experience</div>
                                                <div className="text-sm text-gray-400">Seasoned event organizer</div>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="previousEvents" className="text-gray-300">Previous Events (if
                                    any)</Label>
                                <Textarea
                                    id="previousEvents"
                                    value={data.previousEvents}
                                    onChange={(e) => handleInputChange("previousEvents", e.target.value)}
                                    placeholder="Tell us about events you've organized before..."
                                    rows={3}
                                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-gray-300">Expected Event Volume per Year *</Label>
                                <RadioGroup
                                    value={data.expectedEventVolume}
                                    onValueChange={(value) => handleInputChange("expectedEventVolume", value)}
                                    className="grid grid-cols-1 gap-3"
                                >
                                    <div
                                        className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                        <RadioGroupItem value="1-5" id="1-5" className="border-white/40"/>
                                        <Label htmlFor="1-5" className="text-white cursor-pointer flex-1">
                                            <div>
                                                <div className="font-medium">1-5 events</div>
                                                <div className="text-sm text-gray-400">Small scale organizing</div>
                                            </div>
                                        </Label>
                                    </div>
                                    <div
                                        className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                        <RadioGroupItem value="6-15" id="6-15" className="border-white/40"/>
                                        <Label htmlFor="6-15" className="text-white cursor-pointer flex-1">
                                            <div>
                                                <div className="font-medium">6-15 events</div>
                                                <div className="text-sm text-gray-400">Regular event organizing</div>
                                            </div>
                                        </Label>
                                    </div>
                                    <div
                                        className="flex items-center space-x-3 p-4 rounded-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all">
                                        <RadioGroupItem value="16+" id="16+" className="border-white/40"/>
                                        <Label htmlFor="16+" className="text-white cursor-pointer flex-1">
                                            <div>
                                                <div className="font-medium">16+ events</div>
                                                <div className="text-sm text-gray-400">High volume organizing</div>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div
            className="min-h-screen bg-app-background text-white relative overflow-hidden flex items-center justify-center py-8">
            <div className="relative z-10 w-full max-w-4xl px-4">
                {/* Back to Login Link */}
                <Link to="/auth/login"
                      className="inline-flex items-center text-purple-300 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2"/>
                    Back to Login
                </Link>

                <Card className="bg-app-glass">
                    <CardHeader className="text-center pb-6">
                        <div className="mb-4">
                            <Link to="/"
                                  className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
                                TicketVerse
                            </Link>
                        </div>
                        <CardTitle className="text-3xl font-bold text-white mb-2">Become an Organizer</CardTitle>
                        <p className="text-gray-400">Complete your profile to start creating amazing events</p>

                        {/* Progress Indicator */}
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
                                <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
                            </div>
                            <Progress value={progress} className="h-2"/>
                        </div>
                    </CardHeader>

                    <CardContent className="px-8 pb-8">
                        {renderStep()}

                        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                                className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10 disabled:opacity-50"
                            >
                                <ArrowLeft className="h-4 w-4"/>
                                Previous
                            </Button>

                            {currentStep < totalSteps ? (
                                <Button
                                    onClick={handleNext}
                                    disabled={!validateStep(currentStep)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                                >
                                    Next
                                    <ArrowRight className="h-4 w-4"/>
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!validateStep(currentStep) || isSubmitting}
                                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Submitting..." : "Complete Application"}
                                    <CheckCircle className="h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrganizerOnboarding;

