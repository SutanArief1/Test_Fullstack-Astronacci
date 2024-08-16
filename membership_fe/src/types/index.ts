export interface IArticle {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface IVideo {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ICurrentUser {
  id?: number;
  name?: string;
  fullname?: string;
  email?: string;
  role: "Bronze" | "Silver" | "Platinum";
}