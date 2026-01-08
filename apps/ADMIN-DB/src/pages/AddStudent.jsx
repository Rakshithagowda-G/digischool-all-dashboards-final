import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { UserPlus, ArrowLeft, Upload, Image as ImageIcon, X } from "lucide-react";

const AddStudent = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    class: "",
    academicYear: "",
    studentId: "",
    profilePicture: null,
    governmentProof: null,
    discoverySource: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    relationship: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  // Generate classes 1-12
  const classes = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  
  // Academic years
  const academicYears = [
    "2024-2025",
    "2025-2026",
    "2026-2027",
    "2027-2028",
  ];

  // Gender options
  const genderOptions = ["Male", "Female", "Other"];

  // Relationship options
  const relationshipOptions = ["Father", "Mother", "Guardian", "Other"];

  // Discovery source options
  const discoverySourceOptions = [
    "Google Search",
    "Social Media",
    "Referral from Friend",
    "School Recommendation",
    "Online Advertisement",
    "YouTube Advertisement",
    "School Fair",
    "Newspaper/Magazine",
    "Other",
  ];

  // Handle image uploads with preview
  const handleImageUpload = useCallback((event, field) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "profilePicture") {
          setProfilePreview(reader.result);
        } else if (field === "governmentProof") {
          setProofPreview(reader.result);
        }
        setFormData(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Remove image
  const removeImage = (field) => {
    if (field === "profilePicture") {
      setProfilePreview(null);
    } else if (field === "governmentProof") {
      setProofPreview(null);
    }
    setFormData(prev => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Student Information
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.class) newErrors.class = "Class is required";
    if (!formData.academicYear) newErrors.academicYear = "Academic year is required";
    if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required";
    if (!formData.discoverySource) newErrors.discoverySource = "Discovery source is required";
    
    // Parent Information
    if (!formData.parentName.trim()) newErrors.parentName = "Parent name is required";
    if (!formData.parentEmail.match(/^\S+@\S+\.\S+$/)) newErrors.parentEmail = "Valid parent email is required";
    if (!formData.parentPhone.match(/^\d{10}$/)) newErrors.parentPhone = "Parent phone must be 10 digits";
    if (!formData.relationship) newErrors.relationship = "Relationship is required";
    
    // Address Information
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.match(/^\d{6}$/)) newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setDialogOpen(true);
    }
  };

  const confirmSubmit = async () => {
    try {
      setSubmitting(true);
      
      toast.success(`Student "${formData.firstName} ${formData.lastName}" has been added successfully!`);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        class: "",
        academicYear: "",
        studentId: "",
        profilePicture: null,
        governmentProof: null,
        discoverySource: "",
        parentName: "",
        parentEmail: "",
        parentPhone: "",
        relationship: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
      });
      setProfilePreview(null);
      setProofPreview(null);
      setErrors({});
      setDialogOpen(false);
      
      setTimeout(() => {
        navigate("/students");
      }, 1500);
      
    } catch (error) {
      toast.error("Error adding student: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Add New Student</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Fill in the details to add a new student
          </p>
        </div>
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link to="/students">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      <Card className="p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Profile Picture Section - Responsive */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
              Profile Picture
            </h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-muted overflow-hidden bg-muted flex items-center justify-center">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
                  )}
                </div>
                {profilePreview && (
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute -top-1 -right-1 rounded-full w-7 h-7 sm:w-8 sm:h-8"
                    onClick={() => removeImage("profilePicture")}
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1 w-full">
                <Label htmlFor="profilePicture" className="cursor-pointer">
                  <div className="flex items-center gap-2 sm:gap-3 border-2 border-dashed border-muted-foreground/25 rounded-lg p-3 sm:p-4 hover:border-primary transition-colors">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">Click to upload profile picture</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </Label>
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, "profilePicture")}
                />
              </div>
            </div>
          </div>

          {/* Student Information Section - Responsive Grid */}
          <div className="pt-4 sm:pt-6 border-t">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
              Student Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((gender) => (
                      <SelectItem key={gender} value={gender}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.gender}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className={errors.dateOfBirth ? "border-destructive" : ""}
                />
                {errors.dateOfBirth && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Student Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="student@example.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Student Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="10 digit phone number"
                  maxLength={10}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-sm">Student ID *</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleChange("studentId", e.target.value)}
                  placeholder="e.g., STU-2024-001"
                  className={errors.studentId ? "border-destructive" : ""}
                />
                {errors.studentId && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.studentId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="academicYear" className="text-sm">Academic Year *</Label>
                <Select value={formData.academicYear} onValueChange={(value) => handleChange("academicYear", value)}>
                  <SelectTrigger className={errors.academicYear ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.academicYear && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.academicYear}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="class" className="text-sm">Class *</Label>
                <Select value={formData.class} onValueChange={(value) => handleChange("class", value)}>
                  <SelectTrigger className={errors.class ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.class && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.class}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="discoverySource" className="text-sm">How did you find us? *</Label>
                <Select value={formData.discoverySource} onValueChange={(value) => handleChange("discoverySource", value)}>
                  <SelectTrigger className={errors.discoverySource ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {discoverySourceOptions.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.discoverySource && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.discoverySource}</p>
                )}
              </div>
            </div>
          </div>

          {/* Government Proof Section - Responsive */}
          <div className="pt-4 sm:pt-6 border-t">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
              Government Proof (Optional)
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {proofPreview ? (
                <div className="relative inline-block">
                  <img src={proofPreview} alt="Government proof" className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg border-2 border-muted" />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 rounded-full w-7 h-7 sm:w-8 sm:h-8"
                    onClick={() => removeImage("governmentProof")}
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              ) : (
                <Label htmlFor="governmentProof" className="cursor-pointer">
                  <div className="flex items-center gap-2 sm:gap-3 border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-6 hover:border-primary transition-colors w-full">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium">Click to upload government proof</p>
                      <p className="text-xs text-muted-foreground">Aadhar, Birth Certificate (PNG, JPG up to 2MB)</p>
                    </div>
                  </div>
                </Label>
              )}
              <Input
                id="governmentProof"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "governmentProof")}
              />
            </div>
          </div>

          {/* Parent/Guardian Information Section - Responsive Grid */}
          <div className="pt-4 sm:pt-6 border-t">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
              Parent/Guardian Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="parentName" className="text-sm">Parent/Guardian Name *</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => handleChange("parentName", e.target.value)}
                  placeholder="Enter parent/guardian name"
                  className={errors.parentName ? "border-destructive" : ""}
                />
                {errors.parentName && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.parentName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship" className="text-sm">Relationship *</Label>
                <Select value={formData.relationship} onValueChange={(value) => handleChange("relationship", value)}>
                  <SelectTrigger className={errors.relationship ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationshipOptions.map((rel) => (
                      <SelectItem key={rel} value={rel}>
                        {rel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.relationship && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.relationship}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentEmail" className="text-sm">Parent Email *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleChange("parentEmail", e.target.value)}
                  placeholder="parent@example.com"
                  className={errors.parentEmail ? "border-destructive" : ""}
                />
                {errors.parentEmail && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.parentEmail}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentPhone" className="text-sm">Parent Phone *</Label>
                <Input
                  id="parentPhone"
                  value={formData.parentPhone}
                  onChange={(e) => handleChange("parentPhone", e.target.value)}
                  placeholder="10 digit phone number"
                  maxLength={10}
                  className={errors.parentPhone ? "border-destructive" : ""}
                />
                {errors.parentPhone && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.parentPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Section - Responsive Grid */}
          <div className="pt-4 sm:pt-6 border-t">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Address Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="Enter country"
                  className={errors.country ? "border-destructive" : ""}
                />
                {errors.country && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.country}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  placeholder="Enter state"
                  className={errors.state ? "border-destructive" : ""}
                />
                {errors.state && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.state}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="Enter city"
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode" className="text-sm">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  placeholder="6 digit pincode"
                  maxLength={6}
                  className={errors.pincode ? "border-destructive" : ""}
                />
                {errors.pincode && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.pincode}</p>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address" className="text-sm">Full Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter complete address"
                  className={errors.address ? "border-destructive" : ""}
                />
                {errors.address && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons - Responsive */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
            <Button type="button" variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/students">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </form>
      </Card>

      {/* Confirmation Dialog - Responsive */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">Confirm Adding Student</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Are you sure you want to add "{formData.firstName} {formData.lastName}" as a new student? 
              This action will create a new student profile in the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel disabled={submitting} className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmSubmit} 
              disabled={submitting}
              className="w-full sm:w-auto"
            >
              {submitting ? "Adding..." : "Yes, Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddStudent;
