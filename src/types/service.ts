export interface BuildService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features?: string[];
  badge?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}
