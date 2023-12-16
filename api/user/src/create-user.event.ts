export class CreateUserEvent {
  constructor(
    username: string,
    email: string,
    role: string,
    createdBy: string,
  ) {}
}
export interface UserEvent {
  id: number;
  username: string;
  email: string;
  role: string;
  createdBy?: string;
  // Add other properties as needed
}
