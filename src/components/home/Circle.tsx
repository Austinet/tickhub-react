type CircleProps = {
  className: string;
};

const Circle = ({ className }: CircleProps) => {
  return (
    <div
      className={`${className} w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] bg-blue-600 rounded-full absolute circle`}
    ></div>
  );
};

export default Circle;
