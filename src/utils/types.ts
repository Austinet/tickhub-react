export type TicketProp = {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'in_progress' ;
}