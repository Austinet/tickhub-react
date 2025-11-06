export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

type TicketProp = {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed" | "in_progress";
};

//Performs operations based on different actions
export const reducer = (state: any, action: any) => {
  const items = localStorage.getItem("defaultValues");
  let storedItems;
  // let storedItems = JSON.parse(localStorage.getItem("defaultValues"));
  if (items !== null) {
    storedItems = JSON.parse(items);
  } else {
    storedItems = { ticketList: [], usersDB: [], authenticatedUser: null };
  }

  switch (action.type) {
    case "ADD_USER": {
      storedItems.usersDB.push(action.payload);
      localStorage.setItem("defaultValues", JSON.stringify(storedItems));
      return {
        ...state,
        usersDB: storedItems.usersDB,
      };
    }

    case "USER_LOGGED_IN": {
      const authenticatedUser = storedItems.usersDB.find(
        (user: User) => user.email === action.payload.email
      );

      localStorage.setItem(
        "ticketapp_session",
        JSON.stringify({
          user: authenticatedUser,
          token: new Date().getTime().toString(),
        })
      );

      return {
        ...state,
        authenticatedUser: {
          user: authenticatedUser,
          token: new Date().getTime().toString(),
        },
      };
    }

    case "ADD_TICKET": {
      storedItems.ticketList.unshift(action.payload);
      localStorage.setItem("defaultValues", JSON.stringify(storedItems));

      return {
        ...state,
        ticketList: storedItems.ticketList,
      };
    }

    case "UPDATE_TICKET": {
      const newTicketList = storedItems.ticketList.map((ticket: TicketProp) =>
        ticket.id === action.payload.id ? action.payload : ticket
      );
      storedItems.ticketList = [...newTicketList];
      localStorage.setItem("defaultValues", JSON.stringify(storedItems));
      return {
        ...state,
        ticketList: [...newTicketList],
      };
    }

    case "DELETE_TICKET": {
      const newTicketList = storedItems.ticketList.filter(
        (ticket: TicketProp) => ticket.id !== action.payload
      );
      storedItems.ticketList = [...newTicketList];
      localStorage.setItem("defaultValues", JSON.stringify(storedItems));
      return {
        ...state,
        ticketList: [...newTicketList],
      };
    }

    case "LOG_OUT": {
      const authenticatedUser = null;
      localStorage.setItem(
        "ticketapp_session",
        JSON.stringify(authenticatedUser)
      );

      return {
        ...state,
        authenticatedUser: null,
      };
    }

    default:
      break;
  }
};
