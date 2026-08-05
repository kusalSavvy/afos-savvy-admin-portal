import type { UserProfile } from "@/features/profile/profile.types";

export const mockProfile: UserProfile = {
  id: "ADM-1001",
  firstName: "Super",
  lastName: "Admin",
  email: "superadmin@savvy.com.au",
  phone: "+61 400 123 456",
  role: "Administrator",
  jobTitle: "System Administrator",
  department: "IT Operations",
  location: "Adelaide, Australia",
  timeZone: "Australia/Adelaide",
  status: "active",
  joinedAt: "12 January 2023",
  lastLoginAt: "Today, 9:15 AM",
  mfaEnabled: true,
};