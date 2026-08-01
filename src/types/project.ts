export type PlanTier = "FREE" | "PRO" | "ENTERPRISE";

export type PreviewDevice = "mobile" | "tablet" | "desktop";

export interface ProjectSettings {
  defaultDevice: PreviewDevice;
  theme: "light" | "dark" | "system";
}

export interface ProjectSummary {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  isPublic: boolean;
  fileCount: number;
  lastAgent?: string;
}

export interface ProjectRecord extends ProjectSummary {
  settings: ProjectSettings;
  ownerName: string;
}
