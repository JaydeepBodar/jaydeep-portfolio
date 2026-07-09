export interface Project {
  id: string;
  title: string;
  company: string;
  tags: string[];
  impact: string;
  features: string[];
  iconName: string;
  category: string;
}

export interface Skill {
  name: string;
  category: string;
  level?: 'Advanced' | 'Expert' | 'Intermediate';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  desc: string;
  achievements: string[];
  skillsUsed: string[];
  color: string; // teal, violet, emerald for accent mapping
}

export interface AchievementStat {
  value: string;
  label: string;
  desc: string;
}
