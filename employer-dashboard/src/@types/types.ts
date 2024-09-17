export interface Offer {
  id?: number;
  title: string;
  description: string;
  estimatedTime: number;
  state: number;
  difficult: number;
  price: number;
  technologies: Technology[];
  applied: Applied[];
}

export interface Applied {
  applicationDate: string;
  freelancerDescription: string;
  freelancerId: number;
  freelancerName: string;
  id: number;
  selected: boolean;
  technologies: Technology[];
  valoration: number;
}

export interface Technology {
  id: number;
  name: string;
}

export interface Link {
  id: number;
  name: string;
  url: string;
}

export interface User {
  name: string | null;
  lastName: string | null;
  email: string | null;
  valorationEnum?: number | null;
  offers?: [] | null;
  mediaUrl: string | null;
}
