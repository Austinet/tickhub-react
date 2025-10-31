type CircleProps = {
    className: string
}

const Circle = ({className}: CircleProps) => {
  return (
    <div className={`${className} w-[50px] h-[50px] xl:w-[120px] xl:h-[120px] bg-blue-600 rounded-full absolute`}></div>
  )
}

export default Circle