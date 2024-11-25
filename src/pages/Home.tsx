import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <Navigation />
      <main className="container mx-auto p-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
