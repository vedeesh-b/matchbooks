import CollectionRow from "@/components/features/CollectionRow";
import { Badge } from "@/components/ui/badge";
import { topCollections } from "@/data/topCollections";
import { Balloon, Feather } from "lucide-react";
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

const DescriptionText = styled.p`
  color: #4b5563;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const pageContent = {
  title: "Top Paths",
  body_start: "A curation of our team's favourite reading paths, from",
  body_end: "and beyond",
};

export default function TopPaths() {
  return (
    <div>
      <PageHeader className="scroll-m-20">{pageContent.title}</PageHeader>
      <DescriptionText>
        {pageContent.body_start}{" "}
        <Badge
          variant="outline"
          data-icon="inline-start"
          className="rounded-sm py-1 px-1.5 mx-1 align-middle"
        >
          <Feather size={14} />
          Shakespeare
        </Badge>{" "}
        to{" "}
        <Badge
          variant="outline"
          data-icon="inline-start"
          className="rounded-sm py-1 px-1.5 mx-1 align-middle"
        >
          <Balloon size={14} />
          Seuss
        </Badge>{" "}
        {pageContent.body_end}
      </DescriptionText>
      {topCollections.map((collection) => (
        <CollectionRow
          title={collection.title}
          description={collection.description}
          key={collection.id}
          query={collection.query}
        />
      ))}
    </div>
  );
}
