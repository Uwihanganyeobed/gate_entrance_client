import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Box, Heading, Text, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next"; // Importing useTranslation

const ErrorPage = () => {
  const error = useRouteError();
  const { theme } = useTheme();
  const { t } = useTranslation(); // Get the translation function

  let title = t("Oops!"); // Using translation
  let message = t("An unexpected error has occurred."); // Using translation

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = t("404 - Page Not Found"); // Using translation
      message = t("The page you are looking for does not exist."); // Using translation
    } else if (error.status === 500) {
      title = t("500 - Internal Server Error"); // Using translation
      message = t("Something went wrong on our end."); // Using translation
    } else {
      title = t(`Error ${error.status}`); // Using translation
      message = error.statusText
        ? t(error.statusText)
        : t("An unexpected error has occurred."); // Using translation
    }
  }

  return (
    <Box
      className={`flex flex-col items-center justify-center min-h-screen bg-${
        theme === "dark" ? "gray-800" : "gray-100"
      } p-4 w-full`}
    >
      <Heading
        size="9"
        className={`text-${
          theme === "dark" ? "white" : "gray-800"
        } mb-4 text-center`}
      >
        {title}
      </Heading>
      <Text
        size="4"
        className={`text-${
          theme === "dark" ? "gray-300" : "gray-600"
        } mb-6 text-center max-w-md`}
      >
        {message}
      </Text>
      <Link to="/">
        <Button
          variant="solid"
          className={`bg-${
            theme === "dark" ? "gray-600" : "gray-800"
          } text-white px-6 py-3 rounded-lg hover:bg-${
            theme === "dark" ? "gray-700" : "gray-900"
          } transition-colors duration-200`}
        >
          {t("Go Back Home")} {/* Using translation */}
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
