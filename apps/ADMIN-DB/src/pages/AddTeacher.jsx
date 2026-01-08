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

const AddTeacher = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    qualification: "",
    experience: "",
    subjects: [],
    assignedClasses: [],
    country: "",
    state: "",
    city: "",
    nationalId: "",
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});

  // Available subjects
  const availableSubjects = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Studies",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "History",
    "Geography",
    "Economics",
    "Physical Education",
  ];

  // Available classes
  const availableClasses = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  // Gender options
  const genderOptions = ["Male", "Female", "Other"];

  // Handle image upload with preview
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
        setFormData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Remove image
  const removeImage = () => {
    setProfilePreview(null);
    setFormData(prev => ({ ...prev, profilePicture: null }));
  };

  // Toggle subject selection
  const toggleSubject = (subject) => {
    setFormData(prev => {
      const subjects = prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects };
    });
    if (errors.subjects) {
      setErrors({ ...errors, subjects: "" });
    }
  };

  // Toggle class selection
  const toggleClass = (className) => {
    setFormData(prev => {
      const assignedClasses = prev.assignedClasses.includes(className)
        ? prev.assignedClasses.filter(c => c !== className)
        : [...prev.assignedClasses, className];
      return { ...prev, assignedClasses };
    });
    if (errors.assignedClasses) {
      setErrors({ ...errors, assignedClasses: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!formData.experience || parseInt(formData.experience) < 0) newErrors.experience = "Valid experience is required";
    if (formData.subjects.length === 0) newErrors.subjects = "At least one subject is required";
    if (formData.assignedClasses.length === 0) newErrors.assignedClasses = "At least one class is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.nationalId.trim()) newErrors.nationalId = "National ID is required";

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
      
      toast.success(`Teacher ${formData.firstName} ${formData.lastName} has been added successfully!`);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        qualification: "",
        experience: "",
        subjects: [],
        assignedClasses: [],
        country: "",
        state: "",
        city: "",
        nationalId: "",
        profilePicture: null,
      });
      setProfilePreview(null);
      setErrors({});
      setDialogOpen(false);

      setTimeout(() => {
        navigate("/teachers");
      }, 1500);
    } catch (error) {
      toast.error(`Error adding teacher: ${error.message}`);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Add New Teacher</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Fill in the details to add a new teacher
          </p>
        </div>
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link to="/teachers">
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
                    onClick={removeImage}
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
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          {/* Personal Information Section - Responsive Grid */}
          <div className="pt-4 sm:pt-6 border-t">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Personal Information</h2>
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
                {errors.firstName && <p className="text-xs sm:text-sm text-destructive">{errors.firstName}</p>}
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
                {errors.lastName && <p className="text-xs sm:text-sm text-destructive">{errors.lastName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs sm:text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="10 digit phone number"
                  maxLength={10}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-xs sm:text-sm text-destructive">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm">Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleChange("gender", value)}
                >
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
                {errors.gender && <p className="text-xs sm:text-sm text-destructive">{errors.gender}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationalId" className="text-sm">National ID *</Label>
                <Input
                  id="nationalId"
                  value={formData.nationalId}
                  onChange={(e) => handleChange("nationalId", e.target.value)}
                  placeholder="e.g., AADHAAR-1234-5678-9012"
                  className={errors.nationalId ? "border-destructive" : ""}
                />
                {errors.nationalId && <p className="text-xs sm:text-sm text-destructive">{errors.nationalId}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information Section - Responsive */}
          <div className="pt-4 sm:pt-6 border-t">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Professional Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="qualification" className="text-sm">Qualification *</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => handleChange("qualification", e.target.value)}
                  placeholder="e.g., M.Sc, B.Ed"
                  className={errors.qualification ? "border-destructive" : ""}
                />
                {errors.qualification && <p className="text-xs sm:text-sm text-destructive">{errors.qualification}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm">Experience (Years) *</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                  placeholder="Years of experience"
                  className={errors.experience ? "border-destructive" : ""}
                />
                {errors.experience && <p className="text-xs sm:text-sm text-destructive">{errors.experience}</p>}
              </div>

              {/* Subjects Section - Responsive */}
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-sm">Subjects *</Label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 p-3 sm:p-4 border rounded-lg bg-muted/30 max-h-48 overflow-y-auto">
                  {availableSubjects.map((subject) => (
                    <Button
                      key={subject}
                      type="button"
                      variant={formData.subjects.includes(subject) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSubject(subject)}
                      className="text-xs h-8"
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
                {formData.subjects.length > 0 && (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Selected: {formData.subjects.join(", ")}
                  </p>
                )}
                {errors.subjects && <p className="text-xs sm:text-sm text-destructive">{errors.subjects}</p>}
              </div>

              {/* Assigned Classes Section - Responsive */}
              <div className="space-y-2 sm:col-span-2">
                <Label className="text-sm">Assigned Classes *</Label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 p-3 sm:p-4 border rounded-lg bg-muted/30 max-h-48 overflow-y-auto">
                  {availableClasses.map((className) => (
                    <Button
                      key={className}
                      type="button"
                      variant={formData.assignedClasses.includes(className) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleClass(className)}
                      className="text-xs h-8"
                    >
                      {className}
                    </Button>
                  ))}
                </div>
                {formData.assignedClasses.length > 0 && (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Selected: {formData.assignedClasses.join(", ")}
                  </p>
                )}
                {errors.assignedClasses && <p className="text-xs sm:text-sm text-destructive">{errors.assignedClasses}</p>}
              </div>
            </div>
          </div>

          {/* Location Information Section - Responsive Grid */}
          <div className="pt-4 sm:pt-6 border-t">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Location Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  placeholder="Enter country"
                  className={errors.country ? "border-destructive" : ""}
                />
                {errors.country && <p className="text-xs sm:text-sm text-destructive">{errors.country}</p>}
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
                {errors.state && <p className="text-xs sm:text-sm text-destructive">{errors.state}</p>}
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
                {errors.city && <p className="text-xs sm:text-sm text-destructive">{errors.city}</p>}
              </div>
            </div>
          </div>

          {/* Submit Buttons - Responsive */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
            <Button type="button" variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/teachers">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Teacher
            </Button>
          </div>
        </form>
      </Card>

      {/* Confirmation Dialog - Responsive */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">Confirm Adding Teacher</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Are you sure you want to add {formData.firstName} {formData.lastName} as a new teacher?
              This action will create a new teacher profile in the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel disabled={submitting} className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit} disabled={submitting} className="w-full sm:w-auto">
              {submitting ? "Adding..." : "Yes, Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddTeacher;
