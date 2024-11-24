import { Text, Heading } from '@radix-ui/themes';
import { FaCheckCircle, FaLaptop, FaUser, FaShieldAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center px-4">
        <Heading as="h1" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary font-serif">
          Welcome to <span className="block text-2xl md:text-3xl lg:text-5xl">DeviSec</span>
        </Heading>
        <Text className="text-base md:text-lg lg:text-xl mb-8 text-muted font-sans">
          DeviSec is designed to digitize computer ownership verification and manage gate entries at the University of Rwanda campuses.
        </Text>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-4 flex flex-col items-center">
            <FaCheckCircle className="w-12 h-12 text-secondary mb-4" />
            <Heading as="h2" className="text-xl md:text-2xl font-semibold mb-2 text-secondary font-serif">
              Verify Computer
            </Heading>
            <Text className="text-sm md:text-base text-muted font-sans text-center">
              Easily verify the ownership of computers using QR codes. Ensure that only authorized devices are allowed on campus.
            </Text>
          </div>
          <div className="p-4 flex flex-col items-center">
            <FaLaptop className="w-12 h-12 text-secondary mb-4" />
            <Heading as="h2" className="text-xl md:text-2xl font-semibold mb-2 text-secondary font-serif">
              Register Computer
            </Heading>
            <Text className="text-sm md:text-base text-muted font-sans text-center">
              Register new computers for students and guests. Generate unique QR codes for each device.
            </Text>
          </div>
          <div className="p-4 flex flex-col items-center">
            <FaUser className="w-12 h-12 text-secondary mb-4" />
            <Heading as="h2" className="text-xl md:text-2xl font-semibold mb-2 text-secondary font-serif">
              Register User
            </Heading>
            <Text className="text-sm md:text-base text-muted font-sans text-center">
              Create and manage user profiles. Store and retrieve user photos for verification purposes.
            </Text>
          </div>
          <div className="p-4 flex flex-col items-center">
            <FaShieldAlt className="w-12 h-12 text-secondary mb-4" />
            <Heading as="h2" className="text-xl md:text-2xl font-semibold mb-2 text-secondary font-serif">
              Manage Gate Entries
            </Heading>
            <Text className="text-sm md:text-base text-muted font-sans text-center">
              Efficiently manage gate entries and ensure the security of the campus. Monitor and control access points.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;