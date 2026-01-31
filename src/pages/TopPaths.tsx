import CollectionRow from "@/components/features/CollectionRow";
import { Badge } from "@/components/ui/badge";
import { topCollections } from "@/data/topCollections";
import { Balloon, Feather } from "lucide-react";

export default function TopPaths() {
  return (
    <div>
      <h1 className="scroll-m-20 text-5xl font-bold tracking-tight pt-14 pb-6">
        Our Top Paths
      </h1>
      <p className="text-gray-600">
        A curation of our team's favourite reading paths, from{" "}
        <Badge
          variant="outline"
          data-icon="inline-start"
          className="rounded-sm py-3 px-1.5 mx-1"
        >
          <Feather />
          Shakespeare
        </Badge>{" "}
        to{" "}
        <Badge
          variant="outline"
          data-icon="inline-start"
          className="rounded-sm py-3 px-1.5 mx-1"
        >
          <Balloon />
          Seuss
        </Badge>{" "}
        and beyond.
      </p>
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
