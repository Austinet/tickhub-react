type ButtonProp = {
  label: string;
  onclick?: () => void;
};

const FormButton = ({ label }: ButtonProp) => {
  return (
    <button
      type="submit"
      className="w-full py-4 text-lg md:text-xl text-center font-semibold bg-blue-600 text-white rounded-lg mt-6 mb-2 hover:opacity-90"
    >
      {label}
    </button>
  );
};

export default FormButton;
