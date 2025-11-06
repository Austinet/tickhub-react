import { useState, useEffect } from "react";
import Ticket from "../components/dashboard/Ticket";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuthContext } from "../context/AuthContext";
import ViewTicket from "../components/dashboard/ViewTicket";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

type TicketProp = {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed" | "in_progress";
};

type TicketArrayProp = TicketProp[] | [];

const Tickets = () => {
  const [showViewTicketForm, setShowViewTicketForm] = useState(false);
  const [ticket, setTicket] = useState({} as TicketProp);
  const { dispatch, ticketList } = useAuthContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredTickets, setFilteredTickets] = useState([] as TicketArrayProp);

  const viewTicket = (ticket: TicketProp) => {
    setTicket(ticket);
    setShowViewTicketForm(true);
  };

  const deleteTicket = (id: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    dispatch({ type: "DELETE_TICKET", payload: id });
  };

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    const status = selectedStatus;

    const updateFilteredTickets = ticketList.filter((ticket) => {
      const matchQuery =
        ticket.title.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query);

      const matchStatus =
        status === "all" ? true : ticket.status.toLowerCase() === status;

      return matchQuery && matchStatus;
    });
    setFilteredTickets(updateFilteredTickets);
  }, [searchQuery, selectedStatus, ticketList]);

  return (
    <DashboardLayout>
      <section>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:items-center mb-12">
          <div>
            <h1 className="text-gray-700 text-2xl md:text-3xl font-medium leading-tight mb-2">
              Tickets
            </h1>
            <p className="text-[1.2rem] text-gray-800">
              Manage and track all your tickets
            </p>
          </div>
          <Link
            to={"/tickets/add"}
            className=" bg-blue-800 text-white w-fit px-[1.1rem] py-[0.8rem] md:px-[1.3rem] md:py-4 rounded-[5px] outline-none flex items-center gap-2 text-[1.3rem] font-medium hover:opacity-90"
          >
            <span>+</span>
            <span>Add Ticket</span>
          </Link>
        </div>

        {/* Search and filter features  */}
        <div className="mb-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="w-full max-w-[400px] relative">
            <input
              type="text"
              className="bg-white w-full p-[0.9rem] pr-[3.3rem] border rounded text-[1.1rem] outline-blue-400 "
              placeholder="Search using ticket title or decription"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="text-[1.8rem] absolute top-[0.9rem] right-[0.9rem] text-gray-500" />
          </div>
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border p-[0.9rem] rounded w-[150px] focus:outline focus:outline-blue-400 text-[1.1rem]"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Tickets */}
        {!filteredTickets.length ? (
          <p>No tickets to display</p>
        ) : (
          <div className="flex flex-col flex-wrap gap-14 items-center lg:flex-row ">
            {filteredTickets.map((ticket) => {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  deleteTicket={deleteTicket}
                  viewTicket={viewTicket}
                />
              );
            })}
          </div>
        )}

        {/* View Ticket Form */}
        {showViewTicketForm && (
          <ViewTicket
            ticket={ticket}
            setShowViewTicketForm={setShowViewTicketForm}
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default Tickets;
