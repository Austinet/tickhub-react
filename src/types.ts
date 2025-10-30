
export type Ticket = {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: string; // ISO
}

export type User = {
  email: string;
  name?: string;
}
