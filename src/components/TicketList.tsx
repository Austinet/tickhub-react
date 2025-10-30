import React from "react";
import { Ticket } from "../types";

export default function TicketList({ tickets, onEdit, onDelete }: { tickets: Ticket[], onEdit: (t: Ticket) => void, onDelete: (id: string) => void }){
  if (!tickets.length) return <div className="p-4 text-center text-sm opacity-70">No tickets yet</div>
  return (
    <div className="space-y-3">
      {tickets.map(t => (
        <div key={t.id} className="bg-white p-3 rounded shadow flex items-start justify-between">
          <div>
            <div className="font-semibold">{t.title}</div>
            <div className="text-xs opacity-80">{new Date(t.createdAt).toLocaleString()}</div>
            <div className="mt-1 text-sm opacity-90">{t.description}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm px-2 py-1 rounded text-white" style={{background: t.status === 'open' ? '#10b981' : t.status === 'in-progress' ? '#f59e0b' : '#64748b'}}>{t.status}</div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(t)} className="px-2 py-1 border rounded">Edit</button>
              <button onClick={() => onDelete(t.id)} className="px-2 py-1 border rounded">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}