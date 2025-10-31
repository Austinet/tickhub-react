import { Link, useLocation } from "react-router-dom";
import { FaTicketSimple } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsTicket } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { authenticatedUser, dispatch } = useAuthContext();
  const [openMenu, setOpenMenu] = useState(false);
  const { firstName } = authenticatedUser;
  const location = useLocation();

  const tabStyles = {
    active: "bg-blue-200 text-blue-800",
    others:
      "py-3 px-4 md:py-4 md:px-6 flex items-center gap-3 w-full rounded-lg font-medium text-[1.1rem] md:text-[1.2rem] hover:bg-blue-200 hover:text-blue-800 mb-3",
  };

  const logout = () => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <div className="max-w-[1440px] mx-auto relative">
      <header className="p-4 md:p-8 flex justify-between items-center">
        {/* Logo container */}
        <Link to={"/"}>
          <div className="flex items-center gap-[0.35rem] font-semibold text-[1.3rem] md:text-[1.4rem] ">
            <FaTicketSimple className="text-indigo-600" />
            <h2 className=" bg-linear-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              TickHub
            </h2>
          </div>
        </Link>

        {/* User profile */}
        <div className="flex items-center gap-3">
          <p className="text-lg font-medium">Welcome, {firstName}</p>
          <div className="hidden md:flex bg-blue-600 w-[50px] h-[50px] text-white rounded-full items-center justify-center">
            <p className="text-lg font-medium">{firstName.charAt(0)}</p>
          </div>
          {/* Menu icon for mobile */}
          <button
            className="outline-none lg:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? (
              <IoClose className="text-[1.8rem]" />
            ) : (
              <IoMenu className="text-[1.8rem]" />
            )}
          </button>
        </div>
      </header>

      <main className="flex relative">
        <nav
          className={`lg:p-8 min-w-[250px] lg:min-w-[300px] min-h-[80vh] absolute lg:static ${
            openMenu ? "left-0" : "-left-320 top-0"
          } bg-[#000a] lg:bg-white w-full lg:w-fit`}
        >
          <ul className="bg-white h-screen px-4 py-6 w-[70%] lg:w-full lg:p-0">
            <li>
              <Link
                to={"/dashboard"}
                className={`${
                  location.pathname === "/dashboard" && tabStyles.active
                } ${tabStyles.others}`}
              >
                <LuLayoutDashboard className="text-[1.8rem]" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="mb-40">
              <Link
                to={"/tickets"}
                className={`${
                  location.pathname === "/tickets" && tabStyles.active
                } ${tabStyles.others}`}
              >
                <BsTicket className="text-[1.8rem]" />
                <span>Tickets</span>
              </Link>
            </li>
            <li>
              <button onClick={logout} className={tabStyles.others + " shadow"}>
                <span>Logout</span>
                <MdLogout className="text-[1.8rem]" />
              </button>
            </li>
          </ul>
        </nav>

        {/* iframe */}
        <section className="p-4 lg:p-8 bg-gray-100 w-full min-h-[70vh]">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
