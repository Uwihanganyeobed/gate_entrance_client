import { FC } from "react";

const Hero: FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Security App</h1>
        <p className="text-xl mb-8">
          Protecting our campus with modern technology.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
