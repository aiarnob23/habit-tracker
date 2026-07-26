import { api } from "@/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

interface AuthData {
  userId: number;
  accessToken: string;
}

export const AuthService = {
  async login(payload: LoginPayload): Promise<AuthData> {
    const { data } = await api.post<ApiEnvelope<AuthData>>("/auth/login", payload);
    return data.data;
  },

  async register(payload: RegisterPayload): Promise<AuthData> {
    const { data } = await api.post<ApiEnvelope<AuthData>>("/auth/register", payload);
    return data.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },
};