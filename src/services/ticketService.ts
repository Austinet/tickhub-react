
const KEY = "tickethub:tickets:v1";

type Ticket = {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: string; // ISO
}

export const loadTickets = (): Ticket[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Ticket[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const saveTickets = (tickets: Ticket[]) => {
  localStorage.setItem(KEY, JSON.stringify(tickets));
}

export const createTicket = (ticket: Ticket) => {
  const all = loadTickets();
  all.unshift(ticket);
  saveTickets(all);
}

export const updateTicket = (ticket: Ticket) => {
  const all = loadTickets();
  const idx = all.findIndex(t => t.id === ticket.id);
  if (idx !== -1) all[idx] = ticket;
  saveTickets(all);
}

export const deleteTicket = (id: string) => {
  const all = loadTickets();
  saveTickets(all.filter(t => t.id !== id));
}