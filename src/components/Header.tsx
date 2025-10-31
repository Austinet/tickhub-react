import { Link } from "react-router-dom";
import { FaTicketSimple } from "react-icons/fa6";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";

const navLinks = [
  {
    id: 1,
    href: "#hero",
    label: "About",
  },
  {
    id: 2,
    href: "#features",
    label: "Features",
  },
  {
    id: 3,
    href: "#footer",
    label: "Contact",
  },
];

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="max-w-[1440px] mx-auto px-4 py-4 relative flex justify-between items-center lg:px-6 lg:py-7">
      {/* Logo container */}
      <Link to={"/"}>
        <div className="flex items-center gap-[0.35rem] font-semibold text-[1.4rem] ">
          <FaTicketSimple className="text-indigo-600" />
          <h2 className=" bg-linear-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            TickHub
          </h2>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center">
        <nav
          className={`absolute left-0 lg:static space-y-6 ${
            openMenu ? "top-16" : "-top-80"
          } bg-white z-20 px-4 pb-[1.2rem] w-full lg:p-0 lg:w-fit lg:flex lg:items-center lg:space-y-0 lg:gap-16 shadow-lg lg:shadow-none`}
        >
          <ul className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-16">
            {navLinks.map((link) => {
              const { id, href, label } = link;
              return (
                <li key={id}>
                  <a
                    href={href}
                    className="font-medium text-[1.1rem] text-gray-700 lg:pb-1.5 hover:border-b"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <Link
            to={"/login"}
            className="inline-block bg-blue-600 px-[2.2rem] py-[0.7rem] lg:px-10 lg:py-4 rounded-[15px] text-white text-[1.2rem] font-bold hover:opacity-80"
          >
            Login
          </Link>
        </nav>

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
  );
};

export default Header;
