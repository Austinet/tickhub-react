import { Link } from "react-router-dom";
import { FaFacebook, FaXTwitter, FaLinkedin } from "react-icons/fa6";

const socialLinks = [
  {
    id: 1,
    href: "/",
    icon: <FaFacebook className="hover:scale-150" />,
  },
  {
    id: 2,
    href: "/",
    icon: <FaXTwitter className="hover:scale-150" />,
  },
  {
    id: 3,
    href: "/",
    icon: <FaLinkedin className="hover:scale-150" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white" id="footer">
      <div className="max-w-[1440px] mx-auto px-4 pt-8 md:pt-10 pb-8 text-center space-y-10 md:space-y-16">
        {/* Contact */}
        <ul className="flex justify-center items-center gap-10 text-[1.3rem] lg:text-[2rem] font-medium md:gap-15">
          {socialLinks.map((link) => {
            const { id, href, icon } = link;
            return (
              <li key={id}>
                <Link to={href}>{icon}</Link>
              </li>
            );
          })}
        </ul>

        {/* Copyright */}
        <div>
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
