import { type ReactNode, useEffect, useState } from "react";

import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await AuthService.refreshAccessToken();

        setAuth({
          userId: data.userId,
          accessToken: data.accessToken,
        });
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [setAuth, logout]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}