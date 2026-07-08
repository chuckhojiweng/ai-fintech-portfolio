export interface Parent {
  id: string;
  email: string;
  displayName?: string;
  consentGivenAt?: string;
  consentMethod?: "credit_card" | "government_id" | "signed_form";
  createdAt: string;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  displayName: string;
  avatarConfig: AvatarConfig;
  birthYear?: number;
  difficultyLevel: "easy" | "standard" | "challenge";
  dailyTimeLimitMinutes: number;
  soundEnabled: boolean;
  cocoEnabled: boolean;
  createdAt: string;
}

export interface AvatarConfig {
  bodyColor: string;
  eyeStyle: string;
  accessory?: string;
  hat?: string;
}
