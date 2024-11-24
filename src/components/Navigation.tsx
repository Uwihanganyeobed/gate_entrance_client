import { FC } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { GiSpartanHelmet } from 'react-icons/gi';

const Navigation: FC = () => {
  return (
    <NavigationMenu.Root className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <GiSpartanHelmet className="w-6 h-6 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">Security App</span>
        </div>
        <NavigationMenu.List className="flex space-x-6">
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <a href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </a>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </nav>
    </NavigationMenu.Root>
  );
};

export default Navigation;