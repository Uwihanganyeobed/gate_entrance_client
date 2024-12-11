import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { GiSpartanHelmet } from "react-icons/gi";
import { Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import i18n from "../i18n";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Importing icons for hamburger menu

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme(); // Get the current theme and toggle function
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavigationMenu.Root
      className={`bg-${
        theme === "dark" ? "gray-800" : "white"
      } shadow-md border-b border-gray-200`}
    >
      <nav className={`sticky top-0 z-10 container mx-auto p-5`}>
        <Flex align="center" justify="between" className="gap-5">
          <Flex align="center">
            <Link to="/" className="space-x-2 md:space-x-4">
              <GiSpartanHelmet
                className={`w-5 h-5 md:w-5 md:h-5 ${
                  theme === "dark" ? "text-white" : "text-primary"
                }`}
              />
              <span
                className={`text-lg md:text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-primary"
                } font-serif`}
              >
                DeviSec
              </span>
            </Link>
          </Flex>
          <div className="flex items-center md:hidden">
            {/* Hamburger icon for mobile */}
            <button onClick={handleMenuToggle} className="text-gray-800">
              {isMenuOpen ? (
                <HiX
                  className={`w-10 h-10 ${
                    theme === "dark" ? "text-green-400" : "text-secondary"
                  }`}
                />
              ) : (
                <HiMenu
                  className={`w-10 h-10 ${
                    theme === "dark" ? "text-green-400" : "text-secondary"
                  }`}
                />
              )}
            </button>
          </div>
          <NavigationMenu.List
            className={`hidden md:flex space-x-4 lg:space-x-6 w-full justify-center`}
          >
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  to="/computers/verify"
                  className={`font-medium text-lg md:text-xl lg:text-2xl ${
                    theme === "dark" ? "text-green-300" : "text-muted"
                  } hover:text-accent`}
                >
                  {t("Verify computer")}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  to="/computers/register"
                  className={`font-medium text-lg md:text-xl lg:text-2xl ${
                    theme === "dark" ? "text-green-300" : "text-muted"
                  } hover:text-accent`}
                >
                  {t("Register computer")}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  to="/users/register"
                  className={`font-medium text-lg md:text-xl lg:text-2xl ${
                    theme === "dark" ? "text-green-300" : "text-muted"
                  } hover:text-accent`}
                >
                  {t("Register User")}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-200 text-gray-800"
              }`}
            >
              {t("Theme")}
            </button>
            <select
              id="language"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className={`w-full p-2 border rounded 
    bg-${theme === "dark" ? "gray-800" : "gray-400"} 
    text-${theme === "dark" ? "white" : "gray-700"} 
    border-${theme === "dark" ? "gray-600" : "gray-300"} 
    focus:outline-none focus:ring-2 focus:ring-blue-500 
    transition duration-200 ease-in-out 
    hover:bg-${theme === "dark" ? "gray-700" : "gray-100"}`}
            >
              <option value="" disabled>
                {t("Select language")}
              </option>
              <option value="en">{t("EN")}</option>
              <option value="fr">{t("FR")}</option>
            </select>
          </div>
        </Flex>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden bg-${
              theme === "dark" ? "gray-700" : "white"
            } shadow-md rounded mt-2`}
          >
            <NavigationMenu.List className="flex flex-col space-y-2 p-4">
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/computers/verify"
                    className={`text-lg ${
                      theme === "dark" ? "text-white" : "text-muted"
                    } hover:text-gray-500`}
                  >
                    {t("Verify computer")}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/computers/register"
                    className={`text-lg ${
                      theme === "dark" ? "text-white" : "text-muted"
                    } hover:text-gray-500`}
                  >
                    {t("Register computer")}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link asChild>
                  <Link
                    to="/users/register"
                    className={`text-lg ${
                      theme === "dark" ? "text-white" : "text-muted"
                    } hover:text-gray-500`}
                  >
                    {t("Register User")}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </div>
        )}
      </nav>
    </NavigationMenu.Root>
  );
};

export default Navigation;
