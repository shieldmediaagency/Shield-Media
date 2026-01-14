export interface NavItem {
  label: string;
  href: string;
  image?: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  colSpan: string;
  delay?: number;
}

export interface WorkItem {
  client: string;
  category: string;
  year: string;
  image?: string;
}

export interface StatItem {
  value: string;
  label: string;
}