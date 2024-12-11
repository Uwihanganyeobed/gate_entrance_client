// /* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navigation />
      <main className="w-full">
        {" "}
        {/* Changed to full width */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
