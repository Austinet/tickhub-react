import { MdOutlineDashboard, MdFlashAuto, MdInsertChart } from "react-icons/md";
import Circle from "./Circle";

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
    <section className=" bg-gray-50" id="features">
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
          <Circle className="-top-[0.9rem] right-4 xl:-right-50 xl:top-8" />
        </div>

        {/* Features */}
        <div className="flex flex-col gap-14 items-center text-center lg:flex-row lg:justify-between lg:pb-10">
          {features.map((feature) => {
            const { id, title, description, icon } = feature;
            return (
              <div
                key={id}
                className="space-y-3 bg-white px-4 py-7 rounded-2xl shadow max-w-[350px] hover:scale-110"
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
      </div>
    </section>
  );
};

export default Features;
