import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store";
import { AuthService } from "@/services/auth.service";

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return async () => {
    try {
      await AuthService.logout();
    } catch {
      
    } finally {
      logout();
      navigate({ to: "/login" });
    }
  };
}