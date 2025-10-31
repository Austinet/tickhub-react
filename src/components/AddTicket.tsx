import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { IoClose } from "react-icons/io5";
import Toast from "./Toast";

type AddTicketProp = {
  setShowAddTicketForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const resetTicket = {
  title: "",
  description: "",
  status: "",
};

const ticketErrors = {
  title: false,
  description: false,
  status: false
};

const AddTicket = ({ setShowAddTicketForm }: AddTicketProp) => {
  const { dispatch } = useAuthContext();
  const [newTicket, setNewTicket] = useState(resetTicket);
  const [newTicketErrors, setNewTicketErrors] = useState(ticketErrors);
  const [success, setSuccess] = useState(false);

  const TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;
  const DESCRIPTION_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;

  // Set form property values
  const setProperty = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setNewTicket({
      ...newTicket,
      [e.target.name]: e.target.value
    });
  };

  // Add Ticket
  const addTicket = (e: React.FormEvent) => {
    e.preventDefault();
    let validateForm = newTicketErrors;
    let isFormValidated = true;

    if (!TITLE_REGEX.test(newTicket.title.trim())) {
      validateForm = { ...newTicketErrors, title: true };
      isFormValidated = false;
    } else {
      validateForm = { ...newTicketErrors, title: false };
    }

    if (!DESCRIPTION_REGEX.test(newTicket.description.trim())) {
      console.log(newTicket.description)
      validateForm = { ...validateForm, description: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, description: false };
    }

    if (!newTicket.status) {
       validateForm = { ...validateForm, status: true };
      isFormValidated = false;
    } else {
      validateForm = { ...validateForm, status: false };
    }

    setNewTicketErrors(validateForm);

    if (isFormValidated) {
      dispatch({ type: "ADD_TICKET", payload: {id: new Date().getTime().toString(), ...newTicket} });
      setSuccess(true);
      setNewTicket(resetTicket);
      return
    }
  };

  const closeForm = () => {
    setShowAddTicketForm(false)
    setSuccess(false)
  }

  return (
    <section className="fixed flex justify-center items-center bg-[#000000cc] top-0 left-0 w-full min-h-screen p-4">
      <div className="w-full bg-white max-w-[700px] p-4 lg:p-8 rounded-lg shadow">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium">Create New Ticket</h2>
          <button
            className="text-[1.5rem] outline-none"
            onClick={closeForm}
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={addTicket}>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-[1.3rem] mb-2 font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full p-[0.9rem] border rounded text-[1.1rem] outline-none"
              placeholder="Enter ticket title"
              value={newTicket.title}
              onChange={setProperty}
              required
            />
            <span
              className={`text-red-600 ${
                newTicketErrors.title ? "block" : "hidden"
              }`}
            >
              Please enter a valid title, Must be more than 5 characters, beginning with a
              letter
            </span>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-[1.3rem] mb-2 font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter task description"
              required
              value={newTicket.description}
              onChange={setProperty}
              className="w-full h-[90px] p-[0.9rem] border rounded text-[1.1rem] outline-none resize-none"
            ></textarea>
            <span
              className={`text-red-600 ${
                newTicketErrors.description ? "block" : "hidden"
              }`}
            >
              Please enter a valid description, Must be more than 5 characters,
               beginning with a
              letter
            </span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-[1.3rem] mb-2 font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value={newTicket.status}
              onChange={setProperty}
              required
              className="w-full p-[0.9rem] border rounded text-[1.1rem] outline-none"
            >
              <option value="">Select ticket status</option>
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="closed">Closed</option>
            </select>
            <span
              className={`text-red-600 ${
                newTicketErrors.status ? "block" : "hidden"
              }`}
            >
              Please select ticket status
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-4 px-6 rounded bg-blue-800 text-white outline-none text-[1.2rem] font-medium mt-2  hover:opacity-90"
          >
            Save Ticket
          </button>
        </form>
      </div>

       {/* Successful ticket creation overlay */}
       <Toast success={success} message="Ticket Added Successfully" closeForm={closeForm} />
    </section>
  );
};

export default AddTicket;
