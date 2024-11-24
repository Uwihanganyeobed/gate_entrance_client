import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        {/* Add more sections or components here */}
      </main>
      <Footer />
    </div>
  );
};

export default App;