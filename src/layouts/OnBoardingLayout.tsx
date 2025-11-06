import Footer from "../components/Footer";
import Header from "../components/home/Header";

type OnBoardingLayoutProps = {
  children: React.ReactNode;
};
const OnBoardingLayout = ({children}: OnBoardingLayoutProps) => {
  return <>
    <Header />
    {children}
    <Footer />
  </>;
};

export default OnBoardingLayout;
