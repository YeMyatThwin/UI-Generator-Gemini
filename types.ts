export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface GeneratedCode {
  code: string;
  timestamp: number;
}

export interface PreviewState {
  code: string | null;
  error: string | null;
  isLoading: boolean;
}