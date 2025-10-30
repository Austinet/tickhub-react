import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";




const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
        <FAQ />
        <Contact />
      </main>
       <Footer />
    </>
  )
}

export default Home