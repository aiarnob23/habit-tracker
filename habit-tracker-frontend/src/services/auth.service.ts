import { api } from "@/lib/axios";
import axios from "axios";

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
  //Login
  async login(payload: LoginPayload): Promise<AuthData> {
    const { data } = await api.post<ApiEnvelope<AuthData>>("/auth/login", payload);
    return data.data;
  },

  //Register
  async register(payload: RegisterPayload): Promise<AuthData> {
    const { data } = await api.post<ApiEnvelope<AuthData>>("/auth/register", payload);
    return data.data;
  },

  //Logout
  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  //Refresh - Access token rotation
  async refreshAccessToken(): Promise<{ accessToken: string }> {
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    )
    return { accessToken: data.data.accessToken };
  }
};