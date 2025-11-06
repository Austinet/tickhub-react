import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import { FaCaretLeft } from "react-icons/fa6";
import { useAuthContext } from "../context/AuthContext";

const resetTicket = {
  title: "",
  description: "",
  status: "",
};

const ticketErrors = {
  title: false,
  description: false,
  status: false,
};

const AddTicket = () => {
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();
  const [newTicket, setNewTicket] = useState(resetTicket);
  const [newTicketErrors, setNewTicketErrors] = useState(ticketErrors);
  const [success, setSuccess] = useState(false);

  const TITLE_REGEX = /^(?=.*[A-Za-z])[A-Za-z0-9\s.,!?'’"()\-:]{5,100}$/;
  const DESCRIPTION_REGEX = /^(?=.*[A-Za-z])[\w\s.,!?'"@#%&()\-:;/]{10,500}$/;

  // Set form property values
  const setProperty = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewTicket({
      ...newTicket,
      [e.target.id]: e.target.value,
    });
  };

  const setStatusProperty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProperty(e);
  };

  //Validates input fields
  const validateField = (field: string) => {
    if (field === "title") {
      const title = !TITLE_REGEX.test(newTicket.title);
      setNewTicketErrors({ ...newTicketErrors, title });
    } else if (field === "description") {
      const description = !DESCRIPTION_REGEX.test(newTicket.description);
      setNewTicketErrors({ ...newTicketErrors, description });
    } else if (field === "status") {
      const status = ["open", "in_progress", "closed"].includes(
        newTicket.status
      );
      console.log(status);
      setNewTicketErrors({ ...newTicketErrors, status });
    }
  };

  function validateForm() {
    return (
      !newTicketErrors.title &&
      !newTicketErrors.description &&
      !newTicketErrors.status
    );
  }

  // Add Ticket
  const addTicket = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch({
        type: "ADD_TICKET",
        payload: { id: new Date().getTime().toString(), ...newTicket },
      });
      setSuccess(true);

      // Reset
      setNewTicket(resetTicket);
    } else {
      return;
    }
  };

  const closeForm = () => {
    setSuccess(success);
    navigate("/tickets");
  };

  return (
    <DashboardLayout>
      <section className="w-full bg-white max-w-[700px] p-4 lg:p-8 rounded-lg shadow">
        <div className="mb-8">
          <Link
            to="/tickets"
            className="text-lg flex items-center gap-1 hover:text-slate-500"
          >
            <FaCaretLeft /> <span>Go back</span>
          </Link>
          <h2 className="text-2xl font-medium mt-4">Create New Ticket</h2>
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
              value={newTicket.title}
              onChange={setProperty}
              onInput={() => validateField("title")}
              onBlur={() => validateField("title")}
              className="w-full p-[0.9rem] border rounded text-[1.1rem] outline-none"
              placeholder="Enter ticket title"
              required
            />
            <span
              className={`text-red-600 ${
                newTicketErrors.title ? "block" : "hidden"
              }`}
            >
              Please enter a valid title, Must be more than 5 characters,
              beginning with a letter
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
              id="description"
              value={newTicket.description}
              onChange={setProperty}
              onInput={() => validateField("description")}
              onBlur={() => validateField("description")}
              placeholder="Enter task description"
              required
              className="w-full h-[90px] p-[0.9rem] border rounded text-[1.1rem] outline-none resize-none"
            ></textarea>
            <span
              className={`text-red-600 ${
                newTicketErrors.description ? "block" : "hidden"
              }`}
            >
              Please enter a valid description, Must be more than 10 characters,
              beginning with a letter
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
              onChange={setStatusProperty}
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

        {/* Successful ticket creation overlay */}
        <Toast
          success={success}
          message="Ticket Added Successfully"
          closeForm={closeForm}
        />
      </section>
    </DashboardLayout>
  );
};

export default AddTicket;
