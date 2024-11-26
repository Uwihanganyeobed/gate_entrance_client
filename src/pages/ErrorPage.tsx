// src/pages/ErrorPage.tsx
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Box, Heading, Text, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Oops!";
  let message = "An unexpected error has occurred.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Page Not Found";
      message = "The page you are looking for does not exist.";
    } else if (error.status === 500) {
      title = "500 - Internal Server Error";
      message = "Something went wrong on our end.";
    } else {
      title = `Error ${error.status}`;
      message = error.statusText || "An unexpected error has occurred.";
    }
  }

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Heading size="9" className="text-gray-800 mb-4 text-center">
        {title}
      </Heading>
      <Text size="4" className="text-gray-600 mb-6 text-center max-w-md">
        {message}
      </Text>
      <Link to="/">
        <Button
          variant="solid"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200"
        >
          Go Back Home
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;