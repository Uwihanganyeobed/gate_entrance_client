// src/api/computerService.ts
import APIClient from "./api-client";

export interface Computer {
  regNo?: number;
  nationalId?: number;
  serialNo: string;
  brand: string;
}

const computerClient = new APIClient<Computer>("/computers");

export default computerClient;
