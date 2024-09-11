export interface Offer {
  id?: number;
  title: string;
  description: string;
  price: number;
  estimatedTime: number;
  state: number;
  difficult: number;
  technology: Technology[];
}
export interface Link {
  id: number;
  name: string;
  url: string;
}
export interface Technology {
  id: 0;
  name: string;
}

export interface User {
  name: string | null;
  lastName: string | null;
  mediaUrl: string | null;
  email: string | null;
  valorationEnum: number | null;
  description: string | null;
  links: Link[] | null;
  technologies: Technology[] | null;
}
