// src/hooks/useVerifyComputer.ts
import { useQuery } from '@tanstack/react-query';
import APIClient from '../api/api-client';

interface VerifyComputerResponse {
  photoLink: string;
  regNo?: number;
  nationalId?: number;
  names: string;
  serialNo: string;
}

// Create an instance of APIClient outside the hook
const client = new APIClient<VerifyComputerResponse>('/computers/verify');

export const useVerifyComputer = (qrCodeContent: string) => {
  return useQuery<VerifyComputerResponse, Error>({
    queryKey: ['verifyComputer', qrCodeContent],
    queryFn: async () => {
      return client.get(qrCodeContent);
    },
    enabled: !!qrCodeContent, // Only run the query if qrCodeContent is provided
  });
};