import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
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
    AlertCircle
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
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="h-5 w-5 text-purple-600"/>
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input
                                    id="firstName"
                                    value={data.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name *</Label>
                                <Input
                                    id="lastName"
                                    value={data.lastName}
                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>

                        <div>
                            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                            <Input
                                id="dateOfBirth"
                                type="date"
                                value={data.dateOfBirth}
                                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Building className="h-5 w-5 text-purple-600"/>
                            <h3 className="text-lg font-semibold">Organization Information</h3>
                        </div>

                        <div>
                            <Label>Organization Type *</Label>
                            <RadioGroup
                                value={data.organizationType}
                                onValueChange={(value) => handleInputChange("organizationType", value)}
                                className="mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="individual" id="individual"/>
                                    <Label htmlFor="individual">Individual Event Organizer</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="company" id="company"/>
                                    <Label htmlFor="company">Company/Business</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="nonprofit" id="nonprofit"/>
                                    <Label htmlFor="nonprofit">Non-Profit Organization</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {data.organizationType !== "individual" && (
                            <>
                                <div>
                                    <Label htmlFor="organizationName">Organization Name *</Label>
                                    <Input
                                        id="organizationName"
                                        value={data.organizationName}
                                        onChange={(e) => handleInputChange("organizationName", e.target.value)}
                                        placeholder="Your Organization Name"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="businessRegistrationNumber">Business Registration Number</Label>
                                    <Input
                                        id="businessRegistrationNumber"
                                        value={data.businessRegistrationNumber}
                                        onChange={(e) => handleInputChange("businessRegistrationNumber", e.target.value)}
                                        placeholder="123456789"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="taxId">Tax ID/EIN</Label>
                                    <Input
                                        id="taxId"
                                        value={data.taxId}
                                        onChange={(e) => handleInputChange("taxId", e.target.value)}
                                        placeholder="12-3456789"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        value={data.website}
                                        onChange={(e) => handleInputChange("website", e.target.value)}
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Tell us about yourself and the types of events you plan to organize..."
                                rows={4}
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-5 w-5 text-purple-600"/>
                            <h3 className="text-lg font-semibold">Address Information</h3>
                        </div>

                        <div>
                            <Label htmlFor="address">Street Address *</Label>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                placeholder="123 Main Street"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city">City *</Label>
                                <Input
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                    placeholder="New York"
                                />
                            </div>
                            <div>
                                <Label htmlFor="state">State/Province *</Label>
                                <Input
                                    id="state"
                                    value={data.state}
                                    onChange={(e) => handleInputChange("state", e.target.value)}
                                    placeholder="NY"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                                <Input
                                    id="zipCode"
                                    value={data.zipCode}
                                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                    placeholder="10001"
                                />
                            </div>
                            <div>
                                <Label htmlFor="country">Country *</Label>
                                <Input
                                    id="country"
                                    value={data.country}
                                    onChange={(e) => handleInputChange("country", e.target.value)}
                                    placeholder="United States"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="h-5 w-5 text-purple-600"/>
                            <h3 className="text-lg font-semibold">Verification Documents</h3>
                        </div>

                        <Alert>
                            <Shield className="h-4 w-4"/>
                            <AlertDescription>
                                All documents will be securely stored and used only for verification purposes.
                            </AlertDescription>
                        </Alert>

                        <div>
                            <Label htmlFor="idDocument">Government-issued ID *</Label>
                            <div className="mt-2 flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => document.getElementById("idDocument")?.click()}
                                    className="flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4"/>
                                    Upload ID Document
                                </Button>
                                {data.idDocument && (
                                    <span className="text-sm text-green-600">
                    ✓ {data.idDocument.name}
                  </span>
                                )}
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
                                <div>
                                    <Label htmlFor="businessLicense">Business License *</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => document.getElementById("businessLicense")?.click()}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4"/>
                                            Upload Business License
                                        </Button>
                                        {data.businessLicense && (
                                            <span className="text-sm text-green-600">
                        ✓ {data.businessLicense.name}
                      </span>
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

                                <div>
                                    <Label htmlFor="taxDocument">Tax Document *</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => document.getElementById("taxDocument")?.click()}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4"/>
                                            Upload Tax Document
                                        </Button>
                                        {data.taxDocument && (
                                            <span className="text-sm text-green-600">
                        ✓ {data.taxDocument.name}
                      </span>
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
                );

            case 5:
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Shield className="h-5 w-5 text-purple-600"/>
                            <h3 className="text-lg font-semibold">Banking Information</h3>
                        </div>

                        <Alert>
                            <AlertCircle className="h-4 w-4"/>
                            <AlertDescription>
                                This information is required for payment processing and will be encrypted and stored
                                securely.
                            </AlertDescription>
                        </Alert>

                        <div>
                            <Label htmlFor="bankName">Bank Name *</Label>
                            <Input
                                id="bankName"
                                value={data.bankName}
                                onChange={(e) => handleInputChange("bankName", e.target.value)}
                                placeholder="Bank of America"
                            />
                        </div>

                        <div>
                            <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                            <Input
                                id="accountHolderName"
                                value={data.accountHolderName}
                                onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <Label htmlFor="accountNumber">Account Number *</Label>
                            <Input
                                id="accountNumber"
                                type="password"
                                value={data.accountNumber}
                                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                                placeholder="••••••••••"
                            />
                        </div>

                        <div>
                            <Label htmlFor="routingNumber">Routing Number *</Label>
                            <Input
                                id="routingNumber"
                                value={data.routingNumber}
                                onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                                placeholder="123456789"
                            />
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="h-5 w-5 text-purple-600"/>
                            <h3 className="text-lg font-semibold">Event Experience</h3>
                        </div>

                        <div>
                            <Label>Event Organization Experience *</Label>
                            <RadioGroup
                                value={data.eventExperience}
                                onValueChange={(value) => handleInputChange("eventExperience", value)}
                                className="mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="beginner" id="beginner"/>
                                    <Label htmlFor="beginner">New to event organizing</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="intermediate" id="intermediate"/>
                                    <Label htmlFor="intermediate">1-5 years experience</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="experienced" id="experienced"/>
                                    <Label htmlFor="experienced">5+ years experience</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label htmlFor="previousEvents">Previous Events (if any)</Label>
                            <Textarea
                                id="previousEvents"
                                value={data.previousEvents}
                                onChange={(e) => handleInputChange("previousEvents", e.target.value)}
                                placeholder="Tell us about events you've organized before..."
                                rows={3}
                            />
                        </div>

                        <div>
                            <Label>Expected Event Volume per Year *</Label>
                            <RadioGroup
                                value={data.expectedEventVolume}
                                onValueChange={(value) => handleInputChange("expectedEventVolume", value)}
                                className="mt-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="1-5" id="1-5"/>
                                    <Label htmlFor="1-5">1-5 events</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="6-15" id="6-15"/>
                                    <Label htmlFor="6-15">6-15 events</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="16+" id="16+"/>
                                    <Label htmlFor="16+">16+ events</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Event Organizer Verification
                        </h1>
                        <p className="text-gray-300">
                            Complete your profile to start organizing events
                        </p>
                    </div>

                    <Card className="bg-white/10 backdrop-blur-md border-white/20">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-white">
                                    Step {currentStep} of {totalSteps}
                                </CardTitle>
                                <span className="text-sm text-gray-300">
                  {Math.round(progress)}% Complete
                </span>
                            </div>
                            <Progress value={progress} className="mt-2"/>
                        </CardHeader>

                        <CardContent className="text-white">
                            {renderStep()}

                            <div className="flex justify-between mt-8">
                                <Button
                                    variant="outline"
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4"/>
                                    Previous
                                </Button>

                                {currentStep < totalSteps ? (
                                    <Button
                                        onClick={handleNext}
                                        disabled={!validateStep(currentStep)}
                                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
                                    >
                                        Next
                                        <ArrowRight className="h-4 w-4"/>
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!validateStep(currentStep) || isSubmitting}
                                        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600"
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Application"}
                                        <CheckCircle className="h-4 w-4"/>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OrganizerOnboarding;