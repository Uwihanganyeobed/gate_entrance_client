// src/hooks/useRegisterComputer.ts
import { useMutation } from "@tanstack/react-query";
import APIClient from "../api/api-client";
import { ComputerSchema } from "../validation/computerSchemas";

interface RegisterComputerVariables {
  data: ComputerSchema;
  qrCodeContent: string;
}

export const useRegisterComputer = () => {
  return useMutation<ComputerSchema, Error, RegisterComputerVariables>({
    mutationFn: ({ data, qrCodeContent }) => {
      const { qrcode, ...cleanData } = data;
      const client = new APIClient<ComputerSchema>(
        `/computers/${encodeURIComponent(qrCodeContent)}`
      );
      return client.post(JSON.stringify(cleanData), {
        headers: { "Content-Type": "application/json" },
      });
    },
  });
};
