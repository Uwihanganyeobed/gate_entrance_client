import Footer from "./components/Footer";
// import RegisterUser from "./pages/RegisterUser";
import Navigation from "./components/Navigation";
import RegisterComputer from "./pages/RegisterComputer";

const App = () => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <Navigation />
      <main className="container mx-auto p-1">
        <RegisterComputer />
      </main>
      <Footer />
    </div>
  );
};

export default App;
