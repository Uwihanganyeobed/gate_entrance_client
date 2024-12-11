import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme(); // Get the current theme

  return (
    <>
    <hr />
      <footer className={`text-muted py-6 bg-${theme === 'dark' ? 'gray-800' : 'gray-50'}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <p className="text-xs md:text-sm lg:text-base font-sans">&copy; {new Date().getFullYear()} DeviSec. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/privacy" className="text-xs md:text-sm lg:text-base hover:text-gray-900 font-sans">
            Privacy Policy
          </a>
          <a href="/terms" className="text-xs md:text-sm lg:text-base hover:text-gray-900 font-sans">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
    </>
  
  );
};

export default Footer;