import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AuthService, type RegisterPayload } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => AuthService.register(payload),
    onSuccess: (data) => {
      setAuth(data);
      navigate({ to: "/" });
    },
  });
}