export type AccountStatus = "active" | "inactive";

export type Account = {
  id: string;
  accountType: string;
  accountName: string;
  billingState?: string;
  mobile?: string;
  email?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  createdDate: string;
  lastModifiedDate: string;
  status: AccountStatus;
};