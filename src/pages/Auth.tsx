// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// type User = {
//   email: string;
//   name?: string;
// }

// export default function Auth({ onAuth }: { onAuth: (u: User) => void }){
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const nav = useNavigate();

//   const submit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email) return alert('Enter email');
//     const u: User = { email, name }; // mock auth
//     onAuth(u);
//     nav('/dashboard');
//   }

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center">
//       <div className="w-full max-w-md bg-white shadow rounded p-6">
//         <h3 className="text-xl font-semibold">{isSignUp ? 'Sign up' : 'Log in'}</h3>
//         <form onSubmit={submit} className="mt-4 space-y-3">
//           {isSignUp && (
//             <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full border rounded px-3 py-2" />
//           )}
//           <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2" />
//           <button className="w-full bg-indigo-600 text-white py-2 rounded">{isSignUp ? 'Create account' : 'Log in'}</button>
//         </form>
//         <div className="mt-4 text-sm text-center">
//           <button className="text-indigo-600" onClick={() => setIsSignUp(s => !s)}>{isSignUp ? 'Have an account? Log in' : 'No account? Sign up'}</button>
//         </div>
//       </div>
//     </div>
//   )
// }