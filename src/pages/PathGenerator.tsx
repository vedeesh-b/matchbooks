import PathGrid from "@/components/features/PathGrid";
import SearchBar from "@/components/features/SearchBar";
import { useGeneratePath } from "@/hooks/useGeneratePath";
import styled from "styled-components";

const PageHeader = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  padding-top: 2rem;
  padding-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3rem;
    padding-top: 3.5rem;
    padding-bottom: 1.5rem;
  }
`;

const PageDescription = styled.p`
  color: #4b5563;
  padding-bottom: 2rem;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;

  @media (min-width: 768px) {
    padding-bottom: 3.5rem;
    width: 75%;
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    width: 54%;
  }
`;

const pageContent = {
  title: "Path Generator",
  body: "Find yourself a reading path using a seed book that you already like. For something fresh, our random generator has you covered.",
};

export default function PathGenerator() {
  const { generatePath, generateRandomPath, readingPath, isGenerating } =
    useGeneratePath();

  return (
    <div>
      <PageHeader className="scroll-m-20">{pageContent.title}</PageHeader>
      <PageDescription>{pageContent.body}</PageDescription>
      <SearchBar
        generatePath={generatePath}
        generateRandomPath={generateRandomPath}
        isGenerating={isGenerating}
      />
      <PathGrid books={readingPath} />
    </div>
  );
}
