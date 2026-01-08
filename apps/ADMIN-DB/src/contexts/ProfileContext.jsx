import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext({
  profileDialogOpen: false,
  setProfileDialogOpen: () => {},
  profileData: null,
  setProfileData: () => {},
});

export const ProfileProvider = ({ children }) => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@lms.com",
    phone: "+91 98765 43210",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  return (
    <ProfileContext.Provider
      value={{
        profileDialogOpen,
        setProfileDialogOpen,
        profileData,
        setProfileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};
