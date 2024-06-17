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
