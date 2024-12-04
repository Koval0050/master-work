export interface ILink {
  id: number | string;
  label?: string;
  href: string;
  isOpenNewTab?: boolean;
  icon?: string;
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
