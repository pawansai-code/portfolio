export type ProjectCategory = 'all' | 'ai-ml' | 'fullstack' | 'mobile-iot';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tech: string[];
  role: string;
  github: string | null;
  demo: string | null;
  video?: string | null;
  images: string[];
  featured: boolean;
  highlights: string[];
  architecture?: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  category: string;
  proficiency: number; // 0 - 100
  color: string;
  description: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  period: string;
  type: 'Internship' | 'Full-Time' | 'Research';
  badge: string;
  description: string[];
  skills: string[];
}

export interface Hackathon {
  id: string;
  title: string;
  host: string;
  date: string;
  role: string;
  achievement: string;
  achievementType: 'winner' | 'runner-up' | 'finalist' | 'top5' | 'participant';
  description: string;
  fullDetails: string;
  image: string;
  tags: string[];
  metrics?: string;
}

export interface Workshop {
  id: string;
  title: string;
  type: 'Conducted' | 'Attended';
  role: string;
  date: string;
  audience: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  verificationLink?: string;
  image?: string;
  badgeText: string;
}
