import { Link } from "react-router-dom";
import Circle from "./Circle";

export default function Hero() {
  return (
    <section>
      <div className="relative my-10 md:mt-14 md:mb-0 px-4 text-center space-y-6 max-w-[700px] mx-auto text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Ticket management simplified.
        </h1>
        <p className="mt-4 text-base md:text-lg">
          Create, track and close tickets, all in one place. Fast, simple ticket
          dashboard UI. Take control of your workflow with our intuitive ticket
          management system. Organize, assign, and resolve tickets efficiently,
          and get real-time insight into your teams performance.
        </p>
        <Link
          to={"/register"}
          className="inline-block bg-blue-700 font-bold text-white text-[1.1rem] md:text-[1.3rem] px-10 md:px-16 py-4 md:py-5 rounded-2xl hover:opacity-90 lg:mt-2"
        >
          Get started
        </Link>

        {/* Circle */}
        <Circle className="left-6 bottom-12 lg:-left-40" />
      </div>

      {/* Wavy background */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,64L60,53.3C120,43,240,21,360,42.7C480,64,600,128,720,128C840,128,960,64,1080,74.7C1200,85,1320,171,1380,213.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        <div className="h-[60px] w-full bg-[#0099ff] md:hidden"></div>
      </div>
    </section>
  );
}
