export type ProfileStatus = "active" | "inactive" | "locked";

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  timeZone?: string;
  imageUrl?: string;
  status: ProfileStatus;
  joinedAt: string;
  lastLoginAt?: string;
  mfaEnabled: boolean;
};