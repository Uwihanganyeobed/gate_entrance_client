import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { GiSpartanHelmet } from 'react-icons/gi';
import { Flex } from '@radix-ui/themes';

const Navigation = () => {
  return (
    <NavigationMenu.Root className="bg-white shadow-md border-b border-gray-200">
      <nav className="container mx-auto p-4">
        <Flex align="center" justify="between" className="gap-5">
          <Flex align="center" className="space-x-2 md:space-x-4">
            <GiSpartanHelmet className="w-5 h-5 md:w-8 md:h-8 text-primary" />
            <span className="text-lg md:text-2xl font-bold text-primary font-serif">DeviSec</span>
          </Flex>
          <NavigationMenu.List className="flex space-x-2 md:space-x-4 lg:space-x-6">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <a href="/verify-computer" className="text-xs md:text-sm lg:text-base text-muted hover:text-accent">
                  Verify Computer
                </a>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <a href="/register-computer" className="text-xs md:text-sm lg:text-base text-muted hover:text-accent">
                  Register Computer
                </a>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <a href="/register-user" className="text-xs md:text-sm lg:text-base text-muted hover:text-accent">
                  Register User
                </a>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </Flex>
      </nav>
    </NavigationMenu.Root>
  );
};

export default Navigation;