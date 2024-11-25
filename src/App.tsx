import Footer from "./components/Footer";
// import RegisterUser from "./pages/RegisterUser";
import Navigation from "./components/Navigation";
// import RegisterComputer from "./pages/RegisterComputer";
import VerifyComputer from "./pages/VerifyComputer";

const App = () => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <Navigation />
      <main className="container mx-auto p-1">
        <VerifyComputer />
      </main>
      <Footer />
    </div>
  );
};

export default App;
