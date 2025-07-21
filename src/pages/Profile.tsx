import React, {useState} from "react";
import {useAuth} from "@/state/hooks/useAuth";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card} from "@/components/ui/card";
import {User, Mail, Phone, MapPin, Calendar, Edit, Save, X} from "lucide-react";

const Profile = () => {
    const {user} = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: "", // Additional field not in User type
        address: "", // Additional field not in User type
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // TODO: Implement profile update API call
        console.log("Saving profile data:", formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            email: user?.email || "",
            phone: "", // Additional field not in User type
            address: "", // Additional field not in User type
        });
        setIsEditing(false);
    };

    const getUserInitials = () => {
        if (!user) return "U";
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="min-h-screen bg-app-background py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                    <p className="text-gray-300">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Overview Card */}
                    <div className="lg:col-span-1">
                        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
                            <div className="text-center">
                                <div
                                    className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                    {getUserInitials()}
                                </div>
                                <h2 className="text-xl font-semibold text-white mb-2">
                                    {user?.firstName} {user?.lastName}
                                </h2>
                                <p className="text-gray-300 mb-4">{user?.email}</p>
                                <div className="flex items-center justify-center text-sm text-gray-400 mb-2">
                                    <Calendar className="h-4 w-4 mr-2"/>
                                    Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                                </div>
                                <div
                                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active Account
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Profile Details Card */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                                <Button
                                    onClick={() => setIsEditing(!isEditing)}
                                    variant="ghost"
                                    className="text-purple-300 hover:text-white hover:bg-white/10"
                                >
                                    {isEditing ? <X className="h-4 w-4 mr-2"/> : <Edit className="h-4 w-4 mr-2"/>}
                                    {isEditing ? "Cancel" : "Edit"}
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-gray-300 mb-2 block">
                                            <User className="h-4 w-4 inline mr-2"/>
                                            First Name
                                        </Label>
                                        {isEditing ? (
                                            <Input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                            />
                                        ) : (
                                            <p className="text-white p-2 bg-white/5 rounded-md">{user?.firstName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label className="text-gray-300 mb-2 block">
                                            <User className="h-4 w-4 inline mr-2"/>
                                            Last Name
                                        </Label>
                                        {isEditing ? (
                                            <Input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                            />
                                        ) : (
                                            <p className="text-white p-2 bg-white/5 rounded-md">{user?.lastName}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-gray-300 mb-2 block">
                                        <Mail className="h-4 w-4 inline mr-2"/>
                                        Email Address
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                        />
                                    ) : (
                                        <p className="text-white p-2 bg-white/5 rounded-md">{user?.email}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-gray-300 mb-2 block">
                                        <Phone className="h-4 w-4 inline mr-2"/>
                                        Phone Number
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                        />
                                    ) : (
                                        <p className="text-white p-2 bg-white/5 rounded-md">{formData.phone || "Not provided"}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-gray-300 mb-2 block">
                                        <MapPin className="h-4 w-4 inline mr-2"/>
                                        Address
                                    </Label>
                                    {isEditing ? (
                                        <Input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter your address"
                                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                                        />
                                    ) : (
                                        <p className="text-white p-2 bg-white/5 rounded-md">{formData.address || "Not provided"}</p>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex gap-4 pt-4">
                                        <Button
                                            onClick={handleSave}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                        >
                                            <Save className="h-4 w-4 mr-2"/>
                                            Save Changes
                                        </Button>
                                        <Button
                                            onClick={handleCancel}
                                            variant="ghost"
                                            className="text-gray-300 hover:text-white hover:bg-white/10"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
