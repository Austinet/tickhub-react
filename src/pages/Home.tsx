import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import OnBoardingLayout from "../layouts/OnBoardingLayout";

const Home = () => {
  return (
    <>
      <OnBoardingLayout>
        <main>
          <Hero />
          <Features />
        </main>
      </OnBoardingLayout>
    </>
  );
};

export default Home;
