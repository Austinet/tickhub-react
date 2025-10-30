import { MdOutlineDashboard, MdFlashAuto, MdInsertChart } from "react-icons/md";

const features = [
  {
    id: 1,
    title: "Centralized Ticket Box",
    description:
      "Easily create and manage tickets with a clean and user-friendly interface",
    icon: <MdOutlineDashboard className="inline text-blue-900 text-4xl" />,
  },
  {
    id: 2,
    title: "Automated Workflows",
    description:
      "Automate ticket routing, assignments, and escalations to resolve issues faster",
    icon: <MdFlashAuto className="inline text-blue-900 text-4xl" />,
  },
  {
    id: 3,
    title: "Insightful Reporting",
    description:
      "Track performance, monitor progress with detailed reports powerful analytics",
    icon: <MdInsertChart className="inline text-blue-900 text-4xl" />,
  },
];

const Features = () => {
  return (
    <section className=" bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 py-10">
        {/* Feature header */}
        <div className="relative pb-10 md:my-10 text-center space-y-4 max-w-[600px] mx-auto text-gray-800">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">
            Features
          </h2>
          <p className="mt-4 text-base md:text-lg">
            Everything you need for exceptional support. A powerful, yet
            simple-to-use platform for managing all your tickets
          </p>

          {/* Circle */}
        <div className="w-[50px] h-[50px] xl:w-[150px] xl:h-[150px] bg-blue-600 rounded-full absolute -top-[0.7rem] right-[1rem] lg:top-[1rem] lg:right-[-10rem] xl:right-[-17rem]"></div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-14 items-center text-center lg:flex-row lg:justify-between lg:pb-10">
          {features.map((feature) => {
            const { id, title, description, icon } = feature;
            return (
              <div
                key={id}
                className="space-y-3 bg-white px-4 py-7 rounded-2xl shadow max-w-[350px]"
              >
                <div>
                  {icon}
                  <h3 className="text-lg lg:text-2xl font-medium mt-1">
                    {title}
                  </h3>
                </div>
                <div>
                  <p className="text-base md:text-lg">{description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-semibold">Features</h2>
       <ul className="mt-4 grid sm:grid-cols-2 gap-4">
        <li className="bg-white p-4 rounded shadow">Add & manage tickets</li>
           <li className="bg-white p-4 rounded shadow">Edit status & assign priority</li>
           <li className="bg-white p-4 rounded shadow">Simple persistent storage</li>
          <li className="bg-white p-4 rounded shadow">Responsive UI</li>
         </ul>
      </div>  */}
      </div>
    </section>
  );
};

export default Features;
