import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import styled from "styled-components";
import matchbooksLogo from "@/assets/matchbooks-logo.svg";
import { Link } from "react-router-dom";

const navbarItems = [
  {
    title: "Path Generator",
    path: "/path-generator",
  },
  {
    title: "Top Paths",
    path: "/top-paths",
  },
];

const StyledNav = styled(NavigationMenu)`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
  min-width: 100%;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    padding: 1.5rem 2.5rem;
  }
`;

const StyledList = styled(NavigationMenuList)`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
    margin-left: auto;
  }
`;

export default function Navbar() {
  return (
    <StyledNav>
      <StyledList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/">
              <img src={matchbooksLogo} alt="matchbooks logo" className="h-4" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <LinksContainer>
          {navbarItems.map((item, i) => (
            <NavigationMenuItem key={i}>
              <NavigationMenuLink asChild>
                <Link to={item.path} className="text-sm font-medium">
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </LinksContainer>
      </StyledList>
    </StyledNav>
  );
}
