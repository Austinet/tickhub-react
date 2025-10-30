import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative">
      <div className="my-10 md:mt-14 md:mb-0 px-4 text-center space-y-6 max-w-[700px] mx-auto text-gray-800">
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
          className="inline-block bg-[#0099ff] font-bold text-white text-[1.1rem] md:text-[1.3rem] px-[2.5rem] md:px-[4rem] py-4 rounded-2xl hover:opacity-90 lg:mt-2"
        >
          Get started
        </Link>

        {/* Circle */}
        <div className="w-[50px] h-[50px] xl:w-[150px] xl:h-[150px] bg-blue-600 rounded-full absolute top-[15.5rem] left-[1rem] lg:top-[7rem] lg:left-[10rem]"></div>
      </div>

      {/* Wavy background */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,32L120,64C240,96,480,160,720,160C960,160,1200,96,1320,64L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
        <div className="h-[60px] w-full bg-[#0099ff] md:hidden"></div>
      </div>
    </section>
  );
}
