import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";
import dashboardBG from "../assets/images/illustration-hero.svg";
import FormButton from "../components/FormButton";
import OnBoardingLayout from "../layouts/OnBoardingLayout";

//Default values for user inputs and error checking
const defaultDetails = {
  email: "",
  password: "",
  keepLoggedIn: false,
};

const defaultUserErrors = {
  email: false,
  password: false,
};

const Login = () => {
  const [userLogin, setUserLogin] = useState(defaultDetails);
  const [userLoginErrors, setUserLoginErrors] = useState(defaultUserErrors);
  const [passwordType, setPasswordType] = useState("password");
  const passwordView = useRef<HTMLInputElement>(null!);
  const { dispatch, usersDB } = useAuthContext();
  const navigate = useNavigate();

  // Set form property values
  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value.trim(),
    });
  };

  //Validates user and makes login requests
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const authenticate = usersDB?.find(
      (user) => user.email === userLogin.email
    );

    if (authenticate) {
      if (authenticate.password === userLogin.password) {
        dispatch({ type: "USER_LOGGED_IN", payload: userLogin });
        navigate("/dashboard");
      } else {
        setUserLoginErrors({ ...userLoginErrors, password: true });
      }
    } else {
      setUserLoginErrors({ ...userLoginErrors, email: true });
    }
  };

  //Toggles the password view from hidden to seen for the user
  const togglePasswordView = () => {
    const type = passwordView.current.type === "password" ? "text" : "password";
    setPasswordType(type);
  };

  return (
    <OnBoardingLayout>
      <main>
        <section className="max-w-[1440px] mx-auto">
          <div className="px-4 mx-auto my-8 lg:my-12 xl:flex gap-10">
            <div className="bg-blue-700 xl:w-1/2 rounded-lg md:hidden xl:block">
              <img
                src={dashboardBG}
                className="object-cover object-center"
                alt="Dashboard background"
              />
            </div>
            <div className="xl:w-1/2 py-2 md:pt-6">
              <div className="mb-6 lg:mb-8">
                <h1 className="text-[1.7rem] xl:text-[2rem] text-[#000000d5] font-semibold">
                  Login
                </h1>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3 md:gap-8 mb-3 md:mb-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2 lg:mb-4"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userLogin.email}
                        onChange={setProperty}
                        id="email"
                        className="border border-[#00000093] w-full h-[3.13rem] md: rounded-lg px-3 outline-none focus:border-2"
                        required
                      />
                      <span
                        className={`text-red-600 ${
                          userLoginErrors.email ? "block" : "hidden"
                        }`}
                      >
                        Email not found, please sign up
                      </span>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2 lg:mb-4"
                      >
                        Password:
                      </label>
                      <div className="relative">
                        <input
                          type={passwordType}
                          name="password"
                          value={userLogin.password}
                          onChange={setProperty}
                          ref={passwordView}
                          className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
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
                          userLoginErrors.password ? "block" : "hidden"
                        }`}
                      >
                        Incorrect password
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={userLogin.keepLoggedIn}
                        onChange={(e) =>
                          setUserLogin({
                            ...userLogin,
                            keepLoggedIn: e.currentTarget.checked,
                          })
                        }
                        name="keep-logged-in"
                        id="keep-logged-in"
                      />
                      <label htmlFor="terms" className="text-lg md:font-medium">
                        <span>Keep me logged in</span>
                      </label>
                    </div>
                  </div>
                  <FormButton label="Login" />
                  <div className="text-center">
                    <p className="text-[1.125rem] text-[#000000d5] font-medium">
                      <span>Don&apos;t have an account? </span>
                      <Link to={"/register"} className="text-blue-600">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </OnBoardingLayout>
  );
};

export default Login;
