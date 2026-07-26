import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  userId: number | null
  accessToken: string | null
  isAuthenticated: boolean

  setAuth: (payload: { userId: number; accessToken: string }) => void
  setAccessToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: ({ userId, accessToken }) =>
        set({ userId, accessToken, isAuthenticated: true }),

      setAccessToken: (accessToken) => set({ accessToken }),

      logout: () => set({ userId: null, accessToken: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
)