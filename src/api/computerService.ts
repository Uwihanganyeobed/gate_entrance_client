// src/api/computerService.ts
import APIClient from "./api-client";

export interface Computer {
  regNo?: string;
  nationalId?: string;
  serialNo: string;
  brand: string;
}

const computerClient = new APIClient<Computer>("/computers");

export default computerClient;
