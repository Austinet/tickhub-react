import { IoClose } from "react-icons/io5";

type AddTicketProp = {
  setShowViewTicketForm: React.Dispatch<React.SetStateAction<boolean>>;
  ticket: {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
  }
};

const ViewTicket = ({ setShowViewTicketForm, ticket }: AddTicketProp) => {
  const closeForm = () => {
    setShowViewTicketForm(false)
  }

  const statusBorderStyles = {
    'open': 'border-l-green-500',
    'in_progress': 'border-l-amber-500',
    'closed': 'border-l-gray-500'
  }

  return (
    <section className="fixed flex justify-center items-center bg-[#000000cc] top-0 left-0 w-full min-h-screen">
      <div className={`border-l-6 ${statusBorderStyles[ticket.status]} w-full bg-white max-w-[700px] p-8 rounded-lg shadow`}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium">About Ticket</h2>
          <button
            className="text-[1.5rem] outline-none"
            onClick={closeForm}
          >
            <IoClose />
          </button>
        </div>

        <div>
          <div className="mb-[6">
            <h3
              className="text-[1.3rem] mb-2 font-medium text-gray-800"
            >
              Title
            </h3>
            <p className="text-lg">{ticket.title}</p>
          </div>

          <div className="mb-6">
            <h3
              className="text-[1.3rem] mb-2 font-medium text-gray-800"
            >
              Description
            </h3>
            <p className="text-lg">{ticket.description}</p>
          </div>
          <div className="6">
            <h3 className="text-[1.3rem] mb-2 font-medium text-gray-800">Status</h3>
            <p
               className="text-lg"
            >
              {ticket.status}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewTicket;
