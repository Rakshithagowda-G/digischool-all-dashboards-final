// src/lib/profileStore.js
export const profileStore = {
  profileDialogOpen: false,
  profileData: {
    name: "Admin User",
    email: "admin@lms.com",
    phone: "+91 98765 43210",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  setProfileDialogOpen(open) {
    this.profileDialogOpen = open;
  },
  updateProfile(newData) {
    this.profileData = { ...this.profileData, ...newData };
  }
};
