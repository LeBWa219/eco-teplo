import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Advantages from "./components/Advantages";
import Fuel from "./components/Fuel";
import Products from "./components/Products";
import Applications from "./components/Applications";
import Services from "./components/Services";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Advantages />
        <Fuel />
        <Products />
        <Applications />
        <Services />
        <FAQ />
        <Testimonials />
        <CTA />
        <Contacts />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
