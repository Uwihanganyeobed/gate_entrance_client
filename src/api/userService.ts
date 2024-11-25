// src/api/userService.ts
import APIClient from './api-client';

export interface User {
  id: number;
  name: string;
  type: 'student' | 'guest';
  regNo?: number;
  nationalId?: number;
  photo: string; // URL or path to the user's photo
}

const userClient = new APIClient<User>('/users');

export default userClient;