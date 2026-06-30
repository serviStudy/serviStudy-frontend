export type TurnitoState = 'idle' | 'thinking' | 'speaking' | 'happy';

export type TaskType = 'CREATE_PROFILE' | 'CREATE_OFFER';

export interface TaskStep {
  label: string;
  completed: boolean;
  current?: boolean;
}

export interface TaskPreview {
  // Student profile
  name?: string;
  email?: string;
  description?: string;
  skills?: string[];
  workDays?: string[];
  schedule?: string;
  phone?: string;
  // Employer offer
  title?: string;
  company?: string;
  salary?: number;
  location?: string;
  offerDescription?: string;
  requirements?: string[];
}

export interface ActiveTask {
  taskType: TaskType;
  progress: number;
  steps: TaskStep[];
  preview: TaskPreview;
}

export interface AgentMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  suggestions?: { type: string; list: string[] };
  taskUpdate?: Partial<ActiveTask>;
}
