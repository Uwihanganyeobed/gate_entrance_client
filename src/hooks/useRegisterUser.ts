// src/hooks/useRegisterUser.ts
import { useMutation } from "@tanstack/react-query";
import userClient from "../api/userService";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      userClient.post(data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  });
};
