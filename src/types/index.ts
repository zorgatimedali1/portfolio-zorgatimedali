export interface NavItem {
  label: string;
  href: string;
}

export interface ScrollContextType {
  isScrolled: boolean;
  scrollY: number;
  scrollProgress: number;
}
