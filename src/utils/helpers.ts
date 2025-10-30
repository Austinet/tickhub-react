export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export let defaultValues = JSON.parse(localStorage.getItem("defaultValues"));


if (defaultValues === null) {
  defaultValues = {
    ticket: [],
    ticketTotal: 0,
    isModalOpen: false,
    modalMessage: "",
    usersDB: [],
    authenticatedUser: {} as User,
    isUserLoggedIn: false,
  };

  
  localStorage.setItem("defaultValues", JSON.stringify(defaultValues));
}


//Performs operations based on different actions
export const reducer = (state, action) => {
  const storedItems = JSON.parse(localStorage.getItem("defaultValues"));

  const incrementItem = (payload) => {
    return {
      ...state,
      ticket: state.ticket.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            quantity: item.quantity + payload.quantity,
          };
        } else {
          return item;
        }
      }),
      ticketTotal: state.ticketTotal + payload.price * payload.quantity,
      isModalOpen: true,
      modalMessage: `Added to ticket successfully`,
    };
  };

  const calcTotal = (ticket) => {
    return ticket.reduce(
      (total, items) => (total += items.quantity * items.price),
      0
    );
  };

  switch (action.type) {
    case "ADD_USER": {
      storedItems.usersDB = [...storedItems.usersDB, action.payload];
      localStorage.setItem("defaultValues", JSON.stringify(storedItems));
      // console.log(JSON.parse(localStorage.getItem("defaultValues")));
      return {
        ...state,
        usersDB: [...storedItems.usersDB],
      };
    }

    case "USER_LOGGED_IN": {
      storedItems.isUserLoggedIn = true;
      console.log(action.payload)
      storedItems.authenticatedUser = storedItems.usersDB.find(
        (user: User) => user.email === action.payload.email
      );
      localStorage.setItem("defaultValues", JSON.stringify(storedItems));

      return {
        ...state,
        isUserLoggedIn: storedItems.isUserLoggedIn,
        authenticatedUser: storedItems.authenticatedUser,
      };
    }

    case "ADD_ITEM": {
      if (state.ticket.some((item) => item.id === action.payload.id)) {
        return incrementItem(action.payload);
      } else {
        return {
          ...state,
          ticket: [...state.ticket, { ...action.payload }],
          ticketTotal:
            state.ticketTotal + action.payload.price * action.payload.quantity,
          isModalOpen: true,
          modalMessage: `Added to ticket successfully`,
        };
      }
    }

    case "INCREASE_ITEM":
      return incrementItem(action.payload);

    case "DECREASE_ITEM": {
      let openModal = true;
      let newticket = state.ticket.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity <= 1) {
            openModal = false;
            return item;
          } else {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
        } else {
          return item;
        }
      });
      return {
        ...state,
        ticket: newticket,
        ticketTotal: calcTotal(newticket),
        modalMessage: `Removed from ticket successfully`,
        isModalOpen: openModal,
      };
    }

    case "REMOVE_ITEM": {
      let newticket = state.ticket.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        ticket: newticket,
        ticketTotal: calcTotal(newticket),
        modalMessage: `Removed from ticket successfully`,
        isModalOpen: true,
      };
    }

    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: false,
      };

    
    case "LOG_OUT": {
      localStorage.setItem(
        "defaultValues",
        JSON.stringify({
          ...storedItems,
          isUserLoggedIn: false,
          userAuthenticated: {},
        })
      );

      return {
        ...state,
        isUserLoggedIn: storedItems.isUserLoggedIn,
        userAuthenticated: storedItems.userAuthenticated,
      };
    }

    default:
      break;
  }
};
