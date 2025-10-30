import React, { useState, useEffect } from "react";
import { Ticket } from "../types";
import { v4 as uuid } from 'uuid';

export default function TicketForm({ onSave, editing }: { onSave: (t: Ticket) => void, editing?: Ticket | null }){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Ticket['status']>('open');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description || '');
      setStatus(editing.status);
    }
  }, [editing])

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    const t: Ticket = editing ? { ...editing, title, description, status } : {
      id: uuid(), title, description, status, createdAt: new Date().toISOString()
    };
    onSave(t);
    if (!editing) {
      setTitle(''); setDescription(''); setStatus('open');
    }
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ticket title" className="w-full border rounded px-3 py-2" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Details" className="w-full border rounded px-3 py-2" />
      <div className="flex gap-2 items-center">
        <select value={status} onChange={e => setStatus(e.target.value as any)} className="border rounded px-2 py-1">
          <option value="open">Open</option>
          <option value="in-progress">In progress</option>
          <option value="closed">Closed</option>
        </select>
        <button className="ml-auto bg-indigo-600 text-white px-3 py-1 rounded">Save</button>
      </div>
    </form>
  )
}