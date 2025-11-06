import { AiFillEye } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

type TickProp = {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
};

type TicketProp = {
  ticket: TickProp;
  viewTicket: (ticket: TickProp) => void;
  deleteTicket: (id: string) => void;
};

const Ticket = ({ ticket, viewTicket, deleteTicket }: TicketProp) => {
  const { id, title, description, status } = ticket;

  const statusStyles = {
    open: "bg-green-200 text-green-800",
    in_progress: "bg-amber-200 text-amber-800",
    closed: "bg-gray-200 text-gray-800",
  };

  const statusBorderStyles = {
    open: "border-l-green-500",
    in_progress: "border-l-amber-500",
    closed: "border-l-gray-500",
  };

  return (
    <div
      className={`border-l-4 ${statusBorderStyles[status]} flex flex-col justify-between space-y-3 bg-white px-5 py-5 rounded-lg shadow w-[300px] min-h-[200px]`}
    >
      <div className="space-y-2">
        <h3 className="text-[1.2rem] font-medium">
          {title.length < 22 ? title : `${title.substring(0, 24)}...`}
        </h3>
        <p className="text-[1.1rem]">
          {description.length < 65
            ? description
            : `${description.substring(0, 65)}...`}
        </p>
        <p
          className={`${statusStyles[status]} w-fit px-2 py-1 text-lg rounded-xl`}
        >
          {status === "in_progress" ? "In progress" : status}
        </p>
      </div>
      <div className="flex items-center justify-between gap-12 text-2xl">
        <button
          onClick={() => viewTicket(ticket)}
          className="text-green-700 outline-none"
        >
          <AiFillEye />
        </button>
        <Link
          to={`/tickets/update/${id}`}
          className="text-blue-700 outline-none"
        >
          <FaPencil />
        </Link>
        <button
          onClick={() => deleteTicket(id)}
          className="text-red-700 outline-none"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Ticket;
