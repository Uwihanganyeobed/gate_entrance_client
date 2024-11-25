// src/hooks/useRegisterComputer.ts
import { useMutation } from '@tanstack/react-query';
import computerClient from '../api/computerService';
import { ComputerSchema } from '../validation/computerSchemas'; // Adjust the import path as necessary

export const useRegisterComputer = (qrCodeContent: string) => {
return useMutation<ComputerSchema, Error, FormData>({
    mutationFn: (data: FormData) =>
        computerClient.post(data, {
            headers: { 'Content-Type': 'multipart/form-data' },
            params: { qrCodeContent },
        }),
});
};