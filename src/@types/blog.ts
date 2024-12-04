import { Theme } from ".";

export interface IBlogItem {
  id: number;
  title: string;
  description: string;
  background_image?: string;
  theme?: Theme;
}

export interface IBlogSection {
  id: number;
  title: string;
  slug: string;
  body: string;
}

export interface IBlogPost {
  id: number;
  title: string;
  image: string;
  sections: IBlogSection[];
}
