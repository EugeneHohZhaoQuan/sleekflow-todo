export interface TodoItem {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  status: string;
}

export interface FilterOptions {
  status: string;
  dueDate: string;
}

export interface SortOptions {
  sortBy: string;
  order: string;
}

export interface Login {
  usernameOrEmail: string;
  password: string;
}

export interface Signup {
  username: string;
  email: string;
  password: string;
  passwordHash: string;
}
