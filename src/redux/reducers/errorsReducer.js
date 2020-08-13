import { combineReducers } from "redux";

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_LOGIN_ERROR":
      return "";
    case "LOGIN_INPUT_ERROR":
      return "Please enter your username and password!";
    case "LOGIN_FAILED":
      return "Oops! The username and password didn't match. Try again!";
    case "LOGIN_FAILED_NO_CODE":
      return "Oops! Something went wrong! Is the server running?";
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_REGISTRATION_ERROR":
      return "";
    case "REGISTRATION_INPUT_ERROR":
      return "Please enter your information!";
    case "REGISTRATION_FAILED":
      return "Oops! That didn't work. The username might already be taken. Try again!";
    default:
      return state;
  }
};

const orderMessage = (state = "", action) => {
  switch (action.type) {
    case "SET_ORDER_PLACEMENT_ERROR":
      return 'Error placing order, please try again.';
    case "SET_RETRIEVE_ACTIVE_ORDER_ERROR":
      return 'Sorry, unable to update your order status. Someone will be with you shortly.';
    case "CLEAR_ORDER_PLACEMENT_ERROR":
      return '';
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  orderMessage,
});
