export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  location?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
