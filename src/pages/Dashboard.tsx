
// import { useEffect, useState } from "react";
// import NavBar from "../components/NavBar";
// import TicketForm from "../components/TicketForm";
// import TicketList from "../components/TicketList";
// import * as service from "../services/ticketService";

// type User = {
//   email: string;
//   name?: string;
// }

// type Ticket = {
//   id: string;
//   title: string;
//   description?: string;
//   status: 'open' | 'in-progress' | 'closed';
//   createdAt: string; // ISO
// }

// export default function Dashboard({ user, onLogout }: { user: User, onLogout: () => void }){
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [editing, setEditing] = useState<Ticket | null>(null);

//   useEffect(() => { setTickets(service.loadTickets()); }, []);

//   const handleSave = (t: Ticket) => {
//     if (tickets.some(x => x.id === t.id)) {
//       service.updateTicket(t);
//     } else {
//       service.createTicket(t);
//     }
//     setTickets(service.loadTickets());
//     setEditing(null);
//   }

//   const handleDelete = (id: string) => {
//     if (!confirm('Delete ticket?')) return;
//     service.deleteTicket(id);
//     setTickets(service.loadTickets());
//   }

//   return (
//     <div>
//       <NavBar user={user} onLogout={onLogout} />
//       <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Create / Edit ticket</h3>
//           <TicketForm onSave={handleSave} editing={editing} />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold mb-3">Your tickets</h3>
//           <TicketList tickets={tickets} onEdit={t => setEditing(t)} onDelete={handleDelete} />
//         </div>
//       </main>
//     </div>
//   )
// }


const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard