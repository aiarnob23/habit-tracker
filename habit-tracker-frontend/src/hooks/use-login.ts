import { useMutation } from "@tanstack/react-query";
import { AuthService, type LoginPayload } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "@tanstack/react-router";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
   const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthService.login(payload),
    onSuccess: (data) => {
      console.log(data);
      setAuth(data); 
      navigate({ to: "/" });
    },
  });
}