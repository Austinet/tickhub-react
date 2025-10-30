import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-[1440px] mx-auto px-4 pt-12 pb-8 text-center space-y-16">
        {/* Contact */}
        <ul className="flex justify-center items-center gap-10 text-lg font-medium">
          <li>
            <Link to={'/'}>Facebook</Link>
          </li>
          <li>
            <Link to={'/'}>X</Link>
          </li>
          <li>
            <Link to={'/'}>LinkedIn</Link>
          </li>
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
