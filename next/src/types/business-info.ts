export interface BusinessContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin?: string;
}

export interface BusinessHours {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface BusinessInfo {
  organizationName: string;
  legalName?: string;
  description: string;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    province: string;
    country: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  email: string;
  kvk?: string;
  btw?: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
  };
  contacts: BusinessContact[];
  openingHours?: BusinessHours[];
  founded?: string;
  logo?: string;
}
