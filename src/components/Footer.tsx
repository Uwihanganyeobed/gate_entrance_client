import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} University Security App. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
