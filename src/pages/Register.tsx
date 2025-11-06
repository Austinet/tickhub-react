import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import dashboardBG from "../assets/images/illustration-hero.svg";
import { useAuthContext } from "../context/AuthContext";
import Toast from "../components/Toast";
import FormButton from "../components/FormButton";
import OnBoardingLayout from "../layouts/OnBoardingLayout";

//Default values for user inputs and error checking
const defaultUser = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  termsAndCondition: false,
};

const defaultUserErrors = {
  firstName: false,
  lastName: false,
  email: false,
  phoneNumber: false,
  password: false,
  confirmPassword: false,
  termsAndCondition: false,
};

export default function Register() {
  const [success, setSuccess] = useState(false);
  const [newUser, setNewUser] = useState(defaultUser);
  const [passwordType, setPasswordType] = useState("password");
  const [newUserErrors, setNewUserErrors] = useState(defaultUserErrors);
  const { dispatch, usersDB } = useAuthContext();
  const passwordView = useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();

  const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PHONE_REGEX = /^\d{11}$/;

  // Set form property values
  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.id]: e.target.value.trim(),
    });
  };

  //Toggles the password view from hidden to seen for the user
  const togglePasswordView = () => {
    const type = passwordView.current.type === "password" ? "text" : "password";
    setPasswordType(type);
  };

  //Validates user inputs fields
  const validateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;

    if (field === "firstName") {
      const firstName = !NAME_REGEX.test(newUser.firstName);
      setNewUserErrors({ ...newUserErrors, firstName });
    } else if (field === "lastName") {
      const lastName = !NAME_REGEX.test(newUser.lastName);
      setNewUserErrors({ ...newUserErrors, lastName });
    } else if (field === "phoneNumber") {
      const phoneNumber = !PHONE_REGEX.test(newUser.phoneNumber);
      setNewUserErrors({ ...newUserErrors, phoneNumber });
    } else if (field === "email") {
      const email = newUser.email.trim() ? false : true;
      setNewUserErrors({ ...newUserErrors, email });
    } else if (field === "password") {
      const password = !PASSWORD_REGEX.test(newUser.password);
      setNewUserErrors({ ...newUserErrors, password });
    } else if (field === "confirmPassword") {
      const confirmPassword =
        newUser.confirmPassword === newUser.password ? false : true;
      setNewUserErrors({ ...newUserErrors, confirmPassword });
    }
  };

  function validateForm() {
    return (
      !newUserErrors.firstName &&
      !newUserErrors.lastName &&
      !newUserErrors.phoneNumber &&
      !newUserErrors.email &&
      !newUserErrors.password &&
      !newUserErrors.confirmPassword
    );
  }

  //Validates user inputs and makes sign up requests
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (usersDB?.some((users) => users.phoneNumber === newUser.phoneNumber)) {
        alert("Phone number already used");
        return;
      }

      if (usersDB?.some((users) => users.email === newUser.email)) {
        alert("Email address already used");
        return;
      }

      dispatch({ type: "ADD_USER", payload: newUser });
      setSuccess(true);

      // Reset
      setNewUser(defaultUser);
    }
  };
  return (
    <OnBoardingLayout>
      <main>
        <section className="max-w-[1440px] mx-auto">
          <div className="px-4 mx-auto my-8 lg:my-12 xl:flex gap-10">
            <div className="bg-blue-700 xl:w-1/2 rounded-lg md:hidden xl:block">
              <img
                src={dashboardBG}
                className=" object-cover object-center"
                alt="Dashboard background"
              />
            </div>
            <div className="xl:w-1/2 py-2 md:pt-6">
              <div className="mb-6 lg:mb-8">
                <h1 className="text-[1.7rem] text-[#000000d5] font-semibold">
                  Register
                </h1>
                <p className="text-lg text-[#000000d5]">
                  Sign up to get started
                </p>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6">
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="firstName"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        First Name:
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={newUser.firstName}
                        onChange={setProperty}
                        onInput={validateField}
                        onBlur={validateField}
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          newUserErrors.firstName ? "block" : "hidden"
                        }`}
                      >
                        Must be more than 2 characters, letters only
                      </span>
                    </div>
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="lastName"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Last Name:
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={newUser.lastName}
                        onChange={setProperty}
                        onInput={validateField}
                        onBlur={validateField}
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          newUserErrors.lastName ? "block" : "hidden"
                        }`}
                      >
                        Must be more than 2 characters, letters only
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6">
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="phoneNumber"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Phone Number:
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={newUser.phoneNumber}
                        onChange={setProperty}
                        onInput={validateField}
                        onBlur={validateField}
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          newUserErrors.phoneNumber ? "block" : "hidden"
                        }`}
                      >
                        Phone number must consist of 11 digits
                      </span>
                    </div>
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="email"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={newUser.email}
                        onChange={setProperty}
                        onInput={validateField}
                        onBlur={validateField}
                        className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          newUserErrors.email ? "block" : "hidden"
                        }`}
                      >
                        Enter a valid email address
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6">
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="password"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Password:
                      </label>
                      <div className="relative">
                        <input
                          type={passwordType}
                          id="password"
                          value={newUser.password}
                          onChange={setProperty}
                          onInput={validateField}
                          onBlur={validateField}
                          ref={passwordView}
                          className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 pr-12 outline-none focus:border-2"
                          required
                        />
                        <button
                          className="absolute right-3 top-[0.62rem] outline-none"
                          onClick={togglePasswordView}
                        >
                          {passwordType === "password" ? (
                            <AiFillEye className="text-3xl" />
                          ) : (
                            <AiFillEyeInvisible className="text-3xl" />
                          )}
                        </button>
                      </div>
                      <span
                        className={`text-red-600 ${
                          newUserErrors.password ? "block" : "hidden"
                        }`}
                      >
                        Must be more than 8 characters, should include upper and
                        lowercase letters, a number and a special character
                        (!@#$%)
                      </span>
                    </div>
                    <div className="md:w-[50%]">
                      <label
                        htmlFor="confirmPassword"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                      >
                        Confirm Password:
                      </label>
                      <div className="relative">
                        <input
                          type={passwordType}
                          id="confirmPassword"
                          value={newUser.confirmPassword}
                          onChange={setProperty}
                          onInput={validateField}
                          onBlur={validateField}
                          ref={passwordView}
                          className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 12 outline-none focus:border-2"
                          required
                        />
                        <button
                          className="absolute right-3 top-[0.62rem] outline-none"
                          onClick={togglePasswordView}
                        >
                          {passwordType === "password" ? (
                            <AiFillEye className="text-3xl" />
                          ) : (
                            <AiFillEyeInvisible className="text-3xl" />
                          )}
                        </button>
                      </div>
                      <span
                        className={`text-red-600 ${
                          newUserErrors.confirmPassword ? "block" : "hidden"
                        }`}
                      >
                        Must match the password field
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={newUser.termsAndCondition}
                        onChange={(e) =>
                          setNewUser({
                            ...newUser,
                            termsAndCondition: e.currentTarget.checked,
                          })
                        }
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="text-[0.82rem] md:text-lg"
                      >
                        <span>I agree to all the </span>
                        <Link to="/" className="text-blue-600 font-medium">
                          Terms, Privacy Policy and Conditions
                        </Link>
                      </label>
                    </div>
                    <span
                      className={`text-red-600 ${
                        newUserErrors.termsAndCondition ? "block" : "hidden"
                      }`}
                    >
                      Accept Terms, Privacy Policy and Conditions to continue
                    </span>
                  </div>
                  <FormButton label="Create Account" />
                  <div className="text-center">
                    <p className="text-[1.125rem] text-[#000000d5] font-medium">
                      <span>Already have an account? </span>
                      <Link to={"/login"} className="text-blue-600">
                        Log in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Successful registration overlay */}
          <Toast
            message="Registered Successfully"
            closeForm={() => navigate("/login")}
            success={success}
          />
        </section>
      </main>
    </OnBoardingLayout>
  );
}
