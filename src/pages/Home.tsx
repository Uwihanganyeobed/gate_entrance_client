import { Text, Heading } from "@radix-ui/themes";
import { FaCheckCircle, FaLaptop, FaUser, FaShieldAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { theme } = useTheme(); // Get the current theme
  const { t } = useTranslation(); // Get the translation function

  return (
    <section
      className={`py-20 bg-${theme === "dark" ? "gray-800" : "gray-50"} w-full`}
    >
      <div className="text-center px-4">
        <Heading
          as="h1"
          className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-${
            theme === "dark" ? "white" : "primary"
          } font-serif`}
        >
          {t("Welcome to DeviSec")}{" "}
          <span className="block text-2xl md:text-3xl lg:text-5xl"></span>
        </Heading>
        <Text
          className={`text-base md:text-lg lg:text-xl mb-8 text-${
            theme === "dark" ? "gray-300" : "muted"
          } font-sans`}
        >
          {t("DeviSec description")}
        </Text>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-4 flex flex-col items-center">
            <FaCheckCircle
              className={`w-12 h-12 ${
                theme === "dark" ? "text-green-400" : "text-secondary"
              } mb-4`}
            />
            <Heading
              as="h2"
              className={`text-xl md:text-2xl font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-secondary"
              } font-serif`}
            >
              {t("Verify Computer")}
            </Heading>
            <Text
              className={`text-sm md:text-base text-${
                theme === "dark" ? "gray-300" : "muted"
              } font-sans text-center`}
            >
              {t("Verify Computer Description")}
            </Text>
          </div>
          <div className="p-4 flex flex-col items-center">
            <FaLaptop
              className={`w-12 h-12 ${
                theme === "dark" ? "text-green-400" : "text-secondary"
              } mb-4`}
            />
            <Heading
              as="h2"
              className={`text-xl md:text-2xl font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-secondary"
              } font-serif`}
            >
              {t("Register Computer")}
            </Heading>
            <Text
              className={`text-sm md:text-base text-${
                theme === "dark" ? "gray-300" : "muted"
              } font-sans text-center`}
            >
              {t("Register Computer Description")}
            </Text>
          </div>
          <div className="p-4 flex flex-col items-center">
            <FaUser
              className={`w-12 h-12 ${
                theme === "dark" ? "text-green-400" : "text-secondary"
              } mb-4`}
            />
            <Heading
              as="h2"
              className={`text-xl md:text-2xl font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-secondary"
              } font-serif`}
            >
              {t("Register User")}
            </Heading>
            <Text
              className={`text-sm md:text-base text-${
                theme === "dark" ? "gray-300" : "muted"
              } font-sans text-center`}
            >
              {t(
                "Create and manage user profiles. Store and retrieve user photos for verification purposes."
              )}
            </Text>
          </div>
          <div className="p-4 flex flex-col items-center">
            <FaShieldAlt
              className={`w-12 h-12 ${
                theme === "dark" ? "text-green-400" : "text-secondary"
              } mb-4`}
            />
            <Heading
              as="h2"
              className={`text-xl md:text-2xl font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-secondary"
              } font-serif`}
            >
              {t("Manage Gate Entries")}
            </Heading>
            <Text
              className={`text-sm md:text-base text-${
                theme === "dark" ? "gray-300" : "muted"
              } font-sans text-center`}
            >
              {t("Manage Gate Entries Description")}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
