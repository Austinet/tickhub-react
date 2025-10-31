import { useState } from "react";
import Ticket from "../components/Ticket";
import DashboardLayout from "../layouts/DashboardLayout";
import AddTicket from "../components/AddTicket";
import { useAuthContext } from "../context/AuthContext";
import UpdateTicket from "../components/UpdateTask";
import ViewTicket from "../components/ViewTicket";

type TicketProp = {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed" | "in_progress";
};

const Tickets = () => {
  const [showAddTicketForm, setShowAddTicketForm] = useState(false);
  const [showUpdateTicketForm, setShowUpdateTicketForm] = useState(false);
  const [showViewTicketForm, setShowViewTicketForm] = useState(false);
  const [ticket, setTicket] = useState({} as TicketProp);
  const { dispatch, ticketList } = useAuthContext();

  const updateTicket = (ticket: TicketProp) => {
    setTicket(ticket);
    setShowUpdateTicketForm(true);
  };

  const viewTicket = (ticket: TicketProp) => {
    setTicket(ticket);
    setShowViewTicketForm(true);
  };

  const deleteTicket = (id: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    dispatch({ type: "DELETE_TICKET", payload: id });
  };

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
          <button
            onClick={() => setShowAddTicketForm(true)}
            className=" bg-blue-800 text-white w-fit px-[1.1rem] py-[0.8rem] md:px-[1.3rem] md:py-4 rounded-[5px] outline-none flex items-center gap-2 text-[1.3rem] font-medium hover:opacity-90"
          >
            <span>+</span>
            <span>Add Ticket</span>
          </button>
        </div>

        {/* Tickets */}
        {!ticketList.length ? (
          <p>No tickets to display</p>
        ) : (
          <div className="flex flex-col flex-wrap gap-14 items-center lg:flex-row ">
            {ticketList.map((ticket) => {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  deleteTicket={deleteTicket}
                  updateTicket={updateTicket}
                  viewTicket={viewTicket}
                />
              );
            })}
          </div>
        )}

        {/* Add Ticket Form */}
        {showAddTicketForm && (
          <AddTicket setShowAddTicketForm={setShowAddTicketForm} />
        )}

        {/* View Ticket Form */}
        {showViewTicketForm && (
          <ViewTicket
            ticket={ticket}
            setShowViewTicketForm={setShowViewTicketForm}
          />
        )}

        {/* Update Ticket Form */}
        {showUpdateTicketForm && (
          <UpdateTicket
            ticket={ticket}
            setShowUpdateTicketForm={setShowUpdateTicketForm}
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default Tickets;
