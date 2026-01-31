import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import matchbooksLogo from "@/assets/matchbooks-logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <NavigationMenu className="py-6 px-10 border-solid border-neutral-300 border-b-1 min-w-full justify-between items-center">
      <NavigationMenuList className="flex items-center w-full">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/">
              <img src={matchbooksLogo} alt="matchbooks logo" className="h-4" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <div className="ml-auto flex gap-6">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/path-generator">Path Generator</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/top-paths">Top Paths</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
