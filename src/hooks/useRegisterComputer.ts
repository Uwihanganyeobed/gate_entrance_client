// src/hooks/useRegisterComputer.ts
import { useMutation } from '@tanstack/react-query';
import computerClient from '../api/computerService';
import { ComputerSchema } from '../validation/computerSchemas'; // Adjust the import path as necessary

export const useRegisterComputer = () => {
  return useMutation<ComputerSchema, Error, { data: FormData; qrCodeContent: string }>({
    mutationFn: ({ data, qrCodeContent }) =>
      computerClient.post(data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        url: `/computers/${qrCodeContent}`,
      }),
  });
};