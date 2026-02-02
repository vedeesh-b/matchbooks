import BookCarousel from "@/components/features/BookCarousel";
import { Button } from "@/components/ui/button";
import { Telescope, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeroTitle = styled.h1`
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 2rem;
  line-height: 1.2;
  font-size: 3rem;

  @media (min-width: 640px) {
    font-size: 4rem;
  }
  @media (min-width: 1024px) {
    font-size: 4.5rem;
    line-height: 1.1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 3rem;
  width: 100%;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
    width: auto;
    padding-bottom: 5rem;
  }
`;

const pageContent = {
  title: "Find books that make you feel.",
  body: "Matchbooks helps you discover your next read, with some love from the",
  linkText: "OpenLibrary API",
  linkPath: "https://openlibrary.org",
};

const buttonGroupContent = [
  {
    title: "Find my path",
    icon: <Telescope />,
    path: "/path-generator",
  },
  {
    title: "Explore top paths",
    icon: <Trophy />,
    path: "/top-paths",
  },
];

export default function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pt-10 pb-8 md:pt-14 md:pb-16 w-full scroll-m-20 text-center text-balance">
        <HeroTitle>{pageContent.title}</HeroTitle>
        <p className="text-gray-600 inline-flex flex-wrap justify-center items-baseline text-lg px-4">
          {pageContent.body}
          <Button
            variant="link"
            asChild
            className="pr-0 pl-1.5 text-[16px] h-auto p-0 inline"
          >
            <Link to={pageContent.linkPath} target="_blank">
              {pageContent.linkText}
            </Link>
          </Button>
          .
        </p>
      </div>
      <ButtonGroup>
        {buttonGroupContent.map((content, i) => (
          <Button
            size="lg"
            variant={i === 0 ? "default" : "secondary"}
            asChild
            className="p-6 text-md w-full sm:w-auto"
            key={i}
          >
            <Link to={content.path} className="gap-3 justify-center">
              {content.icon}
              {content.title}
            </Link>
          </Button>
        ))}
      </ButtonGroup>
      <BookCarousel />
    </div>
  );
}
