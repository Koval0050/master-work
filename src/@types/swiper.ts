export interface IReview {
  id?: string;
  name: string;
  rating: number;
  description: string;
  href: string;
}

export interface IGallery {
  id?: string;
  image: string;
  imageAlt?: string;
}

export interface IServices extends IGallery {
  title: string;
}

export interface SwiperProps {
  className?: string;
  title?: string;
  type: "review" | "gallery";
  items: IReview[] | IGallery[];
  spaceBetween?: number;
  showNavigation?: boolean;
  autoplayDelay?: number;
  enableAutoplay?: boolean;
}